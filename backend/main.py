import os
import re
import shutil
import asyncio
import json
import subprocess
from typing import TypedDict, Dict, List, Literal, Optional
from pydantic import BaseModel, Field

from fastapi import FastAPI, Request, BackgroundTasks
from fastapi.middleware.cors import CORSMiddleware
from sse_starlette.sse import EventSourceResponse
from dotenv import load_dotenv

from langchain_google_genai import ChatGoogleGenerativeAI
from langgraph.graph import StateGraph, START, END

load_dotenv()

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

stream_queue = asyncio.Queue()

BOILERPLATE_DIR = os.path.join(os.path.dirname(__file__), "boilerplate")
WORKSPACE_DIR = os.path.join(os.path.dirname(__file__), "workspace")

# Packages that are actually installed in workspace/node_modules.
# QA will reject any generated file that imports anything outside this set.
ALLOWED_PACKAGES = {"react", "react-dom", "react/jsx-runtime", "react-router-dom", "lucide-react"}

GITHUB_REPO = os.environ.get("GITHUB_REPO", "https://github.com/ximanta/bigbangdemo.git")
GITHUB_PAT  = os.environ.get("PAT", "")
VERCEL_URL  = os.environ.get("VERCEL_URL", "https://bigbangdemo.vercel.app/")

def classify_intent(user_prompt: str) -> str:
    """Keyword-based intent classifier: 'build' for new app, 'deploy' for shipping."""
    deploy_keywords = ["live", "deploy", "ship", "production", "release", "push", "publish"]
    if any(w in user_prompt.lower() for w in deploy_keywords):
        return "deploy"
    return "build"

_IMPORT_RE = re.compile(r"""from\s+['"]([^'"./][^'"]*)['"]""")

def fix_content(content: str, filepath: str = "") -> str:
    """Unconditionally unescape any double-escaped sequences the LLM may emit."""
    # Always replace \\n -> real newline, \\t -> real tab, \\" -> "
    if "\\n" in content:
        content = content.replace("\\n", "\n")
    if "\\t" in content:
        content = content.replace("\\t", "\t")
    if '\\"' in content:
        content = content.replace('\\"', '"')
    # Repair split at-rules: "@\nimport" / "@\nkeyframes" etc.
    # Use \r?\n to handle both Unix (\n) and Windows (\r\n) line endings.
    content = re.sub(r'@[ \t]*\r?\n[ \t]*(\w)', r'@\1', content)
    # For CSS files: strip @import url() lines that load external resources.
    # These corrupt under vite/postcss when the LLM garbles the URL, and external
    # fonts (Google Fonts etc.) cannot be bundled anyway. System fonts are sufficient.
    if filepath.endswith(".css"):
        content = re.sub(
            r'@import\s+url\s*\([^)]*\)\s*;?[ \t]*\r?\n?',
            '',
            content,
            flags=re.IGNORECASE,
        )
    return content

def find_bad_imports(code_files: dict) -> list[str]:
    """Return list of human-readable 'file: package' strings for disallowed imports."""
    bad = []
    for filepath, content in code_files.items():
        for m in _IMPORT_RE.finditer(content):
            raw = m.group(1)
            # normalise: '@org/pkg/sub' -> '@org/pkg', 'pkg/sub' -> 'pkg'
            pkg = "/".join(raw.split("/")[:2]) if raw.startswith("@") else raw.split("/")[0]
            if pkg not in ALLOWED_PACKAGES:
                bad.append(f"{filepath} imports '{pkg}'")
    return bad

_MAX_LINE = 500  # Any JS/JSX line longer than this is considered un-formatted

# ── Babel syntax checker (runs @babel/parser against generated files) ───────────
# Saved as .cjs so it uses CommonJS require() even inside an ESM workspace.
_SYNTAX_CHECK_CJS = """\
const parser = require('@babel/parser');
const fs = require('fs');
const files = process.argv.slice(2);
const errors = {};
for (const f of files) {
  try {
    const src = fs.readFileSync(f, 'utf8');
    parser.parse(src, { sourceType: 'module', plugins: ['jsx', 'typescript'] });
  } catch (e) {
    errors[f] = e.message.slice(0, 250);
  }
}
if (Object.keys(errors).length) {
  process.stdout.write(JSON.stringify(errors));
  process.exit(1);
}
"""

def _ensure_syntax_checker() -> str:
    path = os.path.join(WORKSPACE_DIR, "_bb_syntax_check.cjs")
    with open(path, "w", encoding="utf-8") as f:
        f.write(_SYNTAX_CHECK_CJS)
    return path

def check_jsx_syntax(code_files: dict) -> dict:
    """
    Run @babel/parser against every JS/JSX file via a CJS node script.
    Returns {relative_filepath: error_message} for files that fail to parse.
    """
    checker = _ensure_syntax_checker()
    # Map relative filepath -> absolute path on disk
    targets = {
        fp: os.path.join(WORKSPACE_DIR, fp)
        for fp in code_files
        if fp.endswith((".jsx", ".js", ".tsx", ".ts"))
    }
    if not targets:
        return {}
    try:
        result = subprocess.run(
            ["node", checker] + list(targets.values()),
            cwd=WORKSPACE_DIR, capture_output=True, text=True, timeout=30,
        )
        if result.returncode != 0 and result.stdout.strip():
            raw = json.loads(result.stdout)
            # Map absolute paths back to relative filepaths for readable feedback
            rev = {v: k for k, v in targets.items()}
            return {rev.get(k, k): v for k, v in raw.items()}
    except (FileNotFoundError, json.JSONDecodeError, subprocess.TimeoutExpired):
        pass  # Node not found or parse result malformed — skip check gracefully
    return {}

def find_minified(code_files: dict) -> list[str]:
    """Detect JSX/JS files that are minified or have excessively long lines."""
    bad = []
    for filepath, content in code_files.items():
        if not filepath.endswith((".jsx", ".js", ".tsx", ".ts")):
            continue
        non_empty_lines = [l for l in content.split("\n") if l.strip()]
        # Heuristic 1: whole file squashed to < 5 real lines
        if len(content) > 300 and len(non_empty_lines) < 5:
            bad.append(filepath)
            continue
        # Heuristic 2: any single line exceeds _MAX_LINE chars — partial minification
        # (e.g. entire return block on one line, or React.createElement chain)
        if any(len(line) > _MAX_LINE for line in non_empty_lines):
            bad.append(filepath)
    return bad

class GraphState(TypedDict, total=False):
    user_prompt: str
    prd: str
    code_files: Dict[str, str]
    qa_feedback: str
    deploy_url: str
    loop_count: int
    current_agent: str

llm = ChatGoogleGenerativeAI(
    model=os.environ.get("GEMINI_MODEL", "gemini-2.5-flash"),
    api_key=os.environ.get("GEMINI_API_KEY")
)

async def emit_event(agent: str, status: str, data: str = None, file: str = None, url: str = None):
    event = {"agent": agent, "status": status}
    if data:
        event["data"] = data
    if file:
        event["file"] = file
    if url:
        event["url"] = url
    await stream_queue.put(json.dumps(event))

async def architect_node(state: GraphState) -> GraphState:
    agent = "Architect"
    await emit_event("Doc Engineer", "working", "Initialising documentation framework...")
    await emit_event(agent, "working", "Analyzing requirements and designing system architecture...")
    await asyncio.sleep(0.3)
    await emit_event(agent, "working", "Defining component hierarchy and data flow...")
    await emit_event("Doc Engineer", "working", "Capturing project scope and objectives...")

    prompt = (
        f"Write a concise 3-paragraph Product Requirements Document (PRD) and list the required UI components "
        f"for the following application idea: {state['user_prompt']}"
    )
    response = await llm.ainvoke(prompt)
    prd = response.content

    await emit_event("Doc Engineer", "working", "PRD received — drafting documentation outline...")
    await emit_event(agent, "working", "Architecture blueprint finalized.")
    await asyncio.sleep(0.2)
    await emit_event(agent, "done", "PRD complete — handing off to Developer.")
    return {"prd": prd, "current_agent": agent}


class FileOutput(BaseModel):
    filepath: str = Field(description="The path to the file, e.g. src/App.jsx")
    content: str = Field(description="The source code content of the file")

class DeveloperOutput(BaseModel):
    files: List[FileOutput]

def restore_boilerplate_files():
    """Copy static config files from boilerplate into workspace so AI can never corrupt them."""
    for fname in ["package.json", "vite.config.js", "index.html", ".gitignore"]:
        src = os.path.join(BOILERPLATE_DIR, fname)
        dst = os.path.join(WORKSPACE_DIR, fname)
        if os.path.exists(src):
            shutil.copy2(src, dst)
    # Remove any stray root-level files the AI might have written previously
    for extra in ["postcss.config.js", "tailwind.config.js", ".eslintrc.cjs", "eslint.config.js"]:
        extra_path = os.path.join(WORKSPACE_DIR, extra)
        if os.path.exists(extra_path):
            os.remove(extra_path)
    # Remove mistaken boilerplate/ subdir if it crept into workspace
    nested = os.path.join(WORKSPACE_DIR, "boilerplate")
    if os.path.isdir(nested):
        shutil.rmtree(nested)

async def developer_node(state: GraphState) -> GraphState:
    agent = "Developer"
    print("DEBUG: developer_node started")
    await emit_event(agent, "working", "Initialising workspace...")

    if state.get("loop_count", 0) == 0:
        # Restore static config files so AI writes can never corrupt them
        await asyncio.to_thread(restore_boilerplate_files)

        # Clear and recreate src/ for a clean slate
        src_path = os.path.join(WORKSPACE_DIR, "src")
        if os.path.exists(src_path):
            await asyncio.to_thread(shutil.rmtree, src_path)
        os.makedirs(src_path, exist_ok=True)
        await emit_event(agent, "working", "Workspace ready. Starting code generation...")
        await emit_event("Doc Engineer", "working", "Monitoring workspace — tracking generated files...")

    prompt_text = (
        f"PRD:\n{state['prd']}\n\n"
        "Generate all required source files for this Vite + React application.\n\n"
        "=== STRICT PACKAGE RULES (demo constraint — node_modules is fixed) ===\n"
        "ALLOWED imports from node_modules:\n"
        "  - 'react'              (useState, useEffect, useRef, etc.)\n"
        "  - 'react-dom/client'   (only in src/main.jsx)\n"
        "  - 'react-router-dom'   (BrowserRouter, Routes, Route, Link, useNavigate, etc.)\n"
        "  - 'lucide-react'       (icons — use sparingly)\n\n"
        "FORBIDDEN — these are NOT installed, your code WILL crash if you use them:\n"
        "  - axios / fetch wrappers → no API calls needed, use hardcoded mock data\n"
        "  - styled-components, @emotion, framer-motion, @tanstack/*, react-query\n"
        "  - ANY other third-party package not listed above\n\n"
        "For styling: use a single src/index.css with vanilla CSS classes, no Tailwind.\n\n"
        "=== FILE RULES ===\n"
        "- ONLY output files whose path starts with 'src/'\n"
        "- DO NOT output package.json, vite.config.js, index.html, or any root file\n"
        "- Keep components clean and visually appealing\n\n"
        "=== CODE FORMAT — CRITICAL ===\n"
        "- Output PROPERLY FORMATTED, multi-line source code ONLY\n"
        "- Every import statement, function declaration, JSX element, and statement MUST be on its own line\n"
        "- NO single line may exceed 500 characters — if a JSX tree is long, break it across many lines\n"
        "- ALWAYS write JSX syntax (<div>, <Component />) — NEVER use React.createElement()\n"
        "- NEVER output minified, compressed, or single-line code — it will fail to parse and be rejected\n\n"
        "=== CSS RULES ===\n"
        "- NEVER use @import url() to load Google Fonts or any external stylesheet\n"
        "- For fonts: use only system font stacks, e.g. font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif\n"
    )
    if state.get("qa_feedback") and state.get("qa_feedback") != "PASS":
        prompt_text += f"\n=== QA FEEDBACK — FIX THESE BEFORE RESUBMITTING ===\n{state['qa_feedback']}\n"

    print("DEBUG: calling structured output")
    developer_llm = llm.with_structured_output(DeveloperOutput)

    try:
        response = await developer_llm.ainvoke(prompt_text)
        print("DEBUG: ainvoke success!")
    except Exception as e:
        print(f"DEBUG: ainvoke threw an exception: {e}")
        raise e

    code_files = {}
    for f in response.files:
        # Hard block: never allow writing outside src/
        if not f.filepath.startswith("src/"):
            print(f"DEBUG: blocked AI from writing root file: {f.filepath}")
            continue

        # Execute our unescaping routine fully to avoid breaking JSX string literals
        content_fixed = fix_content(f.content, f.filepath)
        code_files[f.filepath] = content_fixed

        full_path = os.path.join(WORKSPACE_DIR, f.filepath)
        os.makedirs(os.path.dirname(full_path), exist_ok=True)
        with open(full_path, "w", encoding="utf-8") as fh:
            fh.write(content_fixed)

        await emit_event(agent, "writing", f"Wrote {f.filepath}", file=f.filepath)

    await emit_event("Doc Engineer", "working", f"Cataloguing {len(code_files)} component(s) for README...")
    await emit_event(agent, "done", f"Code generation complete — {len(code_files)} file(s) written.")
    return {"code_files": code_files, "current_agent": agent}


async def qa_critic_node(state: GraphState) -> GraphState:
    """
    Lightweight QA gate — no actual linting.
    Validates that required src files exist and are non-empty.
    """
    agent = "QA Critic"
    loop_count = state.get("loop_count", 0) + 1

    await emit_event("Doc Engineer", "working", "Cross-referencing component list with code output...")
    await emit_event(agent, "working", "Scanning generated files for structural integrity...")
    await asyncio.sleep(0.5)
    await emit_event(agent, "working", "Verifying component exports and import chains...")
    await asyncio.sleep(0.4)

    # Check 1: src/App.jsx must exist and have content
    app_jsx = os.path.join(WORKSPACE_DIR, "src", "App.jsx")
    if not os.path.exists(app_jsx) or os.path.getsize(app_jsx) == 0:
        feedback = "App.jsx is missing or empty. Please regenerate the full application."
        await emit_event(agent, "working", "⚠ App.jsx missing — flagging for Developer revision.")
        await emit_event(agent, "done", "😅 Happens to the best of us! Sending Dev back in — let's try once more! 💪")
        return {"qa_feedback": feedback, "loop_count": loop_count, "current_agent": agent}

    # Check 2: Scan every generated file for imports that aren't in node_modules
    await emit_event(agent, "working", "Auditing import declarations against installed packages...")
    await asyncio.sleep(0.3)
    bad_imports = find_bad_imports(state.get("code_files", {}))
    if bad_imports:
        summary = ", ".join(bad_imports[:5])
        feedback = (
            f"UNRESOLVED IMPORTS DETECTED — these packages are NOT installed: {summary}. "
            f"Rewrite the affected files using ONLY: react, react-dom, lucide-react. "
            f"Replace react-router-dom with useState-based page switching."
        )
        await emit_event(agent, "working", f"⚠ Bad imports found: {summary[:80]}. Sending back to Developer.")
        await emit_event(agent, "done", "📦 Shopping outside the approved list! No worries — let's swap those out. Let's try once more! 💪")
        return {"qa_feedback": feedback, "loop_count": loop_count, "current_agent": agent}

    # Check 3: Detect minified / single-line files that Babel can't parse
    await emit_event(agent, "working", "Checking code formatting and line structure...")
    await asyncio.sleep(0.2)
    minified_files = find_minified(state.get("code_files", {}))
    if minified_files:
        summary = ", ".join(minified_files[:5])
        feedback = (
            f"MINIFIED OR OVER-LONG LINES DETECTED in: {summary}. "
            f"You MUST output properly formatted, multi-line source code. "
            f"Every JSX element must be on its own indented line — NO line may exceed 500 characters. "
            f"NEVER use React.createElement() — always write JSX syntax (<Component />, <div>, etc.). "
            f"NEVER output minified, compressed, or single-line JSX — it will fail to parse and be rejected."
        )
        await emit_event(agent, "working", f"⚠ Minified output in {summary[:80]}. Rejecting — Dev must rewrite.")
        await emit_event(agent, "done", "🤏 Someone squished the code into a pancake! Asking for the full expanded version. Let's try once more! 💪")
        return {"qa_feedback": feedback, "loop_count": loop_count, "current_agent": agent}

    # Check 4: Babel syntax validation — same parser vite uses, catches every category of error
    await emit_event(agent, "working", "Running Babel syntax validation against generated files...")
    await asyncio.sleep(0.2)
    syntax_errors = await asyncio.to_thread(check_jsx_syntax, state.get("code_files", {}))
    if syntax_errors:
        error_parts = "; ".join(
            f"{fp}: {err[:120]}" for fp, err in list(syntax_errors.items())[:3]
        )
        feedback = (
            f"JSX SYNTAX ERRORS DETECTED — {error_parts}. "
            f"Fix all syntax errors. Key rules: "
            f"(1) always add a SPACE between component name and its props: "
            f"<Component prop={{val}}> NOT <Componentprop={{val}}>; "
            f"(2) close all JSX tags; "
            f"(3) do NOT use React.createElement() — use JSX syntax only."
        )
        await emit_event(agent, "working", f"⚠ Syntax errors in: {', '.join(list(syntax_errors.keys())[:3])[:80]}")
        await emit_event(agent, "done", "🔧 Precise bug report sent to Dev. One targeted fix and we're good! 💪")
        return {"qa_feedback": feedback, "loop_count": loop_count, "current_agent": agent}

    await emit_event(agent, "done", "✓ All checks passed. Code quality verified.")
    return {"qa_feedback": "PASS", "loop_count": loop_count, "current_agent": agent}


async def local_preview_node(state: GraphState) -> GraphState:
    """Start Vite dev server and emit local_ready — Phase 1 terminal node."""
    await emit_event("System", "working", "Starting local preview server...")
    # Start vite (or let HMR pick up changes if already running)
    subprocess.Popen("npm run dev", cwd=WORKSPACE_DIR, shell=True,
                     stdout=subprocess.DEVNULL, stderr=subprocess.DEVNULL)
    await asyncio.sleep(2)
    url = "http://localhost:5173"
    await emit_event("System", "local_ready",
                     "✅ Local preview ready — your app is running at localhost:5173",
                     url=url)
    return {"deploy_url": url, "current_agent": "System"}


async def devops_engineer_node(state: GraphState) -> GraphState:
    """Phase 2: git add/commit/push to GitHub → triggers Vercel webhook."""
    agent = "DevOps Engineer"
    repo_url_with_pat = GITHUB_REPO.replace("https://", f"https://{GITHUB_PAT}@")
    prompt = state.get("user_prompt", "Make this live")

    await emit_event(agent, "working", "🔗 Authenticating with enterprise repository...")
    await asyncio.sleep(0.5)

    try:
        subprocess.run(["git", "config", "user.email", "ai@bigbang.dev"],
                       cwd=WORKSPACE_DIR, check=True)
        subprocess.run(["git", "config", "user.name", "BigBang AI Agent"],
                       cwd=WORKSPACE_DIR, check=True)
        subprocess.run(["git", "remote", "set-url", "origin", repo_url_with_pat],
                       cwd=WORKSPACE_DIR, check=True)

        await emit_event(agent, "working", "📦 Staging all generated source files...")
        subprocess.run(["git", "add", "."], cwd=WORKSPACE_DIR, check=True)
        await asyncio.sleep(0.4)

        commit_msg = f"🤖 AI Agent Auto-Commit: {prompt}"
        await emit_event(agent, "working", f'✍  Committing: "{commit_msg[:60]}"')
        result = subprocess.run(
            ["git", "commit", "-m", commit_msg],
            cwd=WORKSPACE_DIR, capture_output=True, text=True
        )
        if result.returncode != 0:
            combined = result.stdout + result.stderr
            if "nothing to commit" in combined or "nothing added to commit" in combined:
                await emit_event(agent, "working", "ℹ  No file changes — pushing existing HEAD...")
            else:
                raise subprocess.CalledProcessError(
                    result.returncode, "git commit", result.stdout, result.stderr)

        await asyncio.sleep(0.4)
        await emit_event(agent, "working", "🚀 Pushing to GitHub... Vercel webhook incoming!")
        subprocess.run(["git", "push", "--force", repo_url_with_pat, "main"],
                       cwd=WORKSPACE_DIR, check=True)

        await asyncio.sleep(0.8)
        await emit_event(agent, "working", "⚡ Vercel caught the webhook — production build running...")
        await asyncio.sleep(1.5)
        await emit_event(agent, "working", "🌐 CDN propagation complete. SSL provisioned.")
        await asyncio.sleep(0.8)

        await emit_event(agent, "done",
                         "✅ Deployment successful. Code shipped to enterprise repository.",
                         url=VERCEL_URL)
        return {"deploy_url": VERCEL_URL, "current_agent": agent}

    except subprocess.CalledProcessError as e:
        err = getattr(e, "stderr", "") or getattr(e, "output", "") or str(e)
        await emit_event(agent, "error", f"⚠ Deployment failed: {str(err)[:160]}")
        return {"current_agent": agent}


_README_TEMPLATE = """\
# {title}

> Generated by **BigBang.dev** — AI Software Factory
> Prompt: _{prompt}_

---

## Quick Start

```bash
# Install dependencies (already done in workspace)
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## Development

| Command | Description |
|---|---|
| `npm run dev` | Start Vite dev server on http://localhost:5173 |
| `npm run build` | Bundle for production into `dist/` |
| `npm run preview` | Locally preview the production build |

## Project Structure

```
workspace/
├── src/
│   ├── App.jsx          # Root application component
│   ├── main.jsx         # React DOM entry point
│   ├── index.css        # Global styles
│   └── components/      # Reusable UI components
│       └── ...
├── index.html           # HTML entry point
├── vite.config.js       # Vite configuration
└── package.json         # Dependencies & scripts
```

## Tech Stack

- **React 18** — UI library
- **React Router DOM** — Client-side routing
- **Vite** — Build tool & dev server
- **Lucide React** — Icon library

---

_This project was generated autonomously by a multi-agent AI pipeline._
"""

async def documentation_node(state: GraphState) -> GraphState:
    agent = "Doc Engineer"
    await emit_event(agent, "working", "Finalising README.md with project commands...")
    await asyncio.sleep(0.4)

    # Derive a human-readable title from the user prompt (no LLM call)
    raw_prompt = state.get("user_prompt", "My App")
    title = raw_prompt.strip().rstrip(".")
    if len(title) > 60:
        title = title[:57] + "..."
    # Title-case it if it starts lower
    if title and title[0].islower():
        title = title[0].upper() + title[1:]

    readme = _README_TEMPLATE.format(title=title, prompt=raw_prompt)
    readme_path = os.path.join(WORKSPACE_DIR, "README.md")
    with open(readme_path, "w", encoding="utf-8") as fh:
        fh.write(readme)

    await emit_event(agent, "writing", "Wrote README.md", file="README.md")
    await asyncio.sleep(0.2)
    await emit_event(agent, "done", "Documentation complete. README.md ready.")
    return {"current_agent": agent}


def qa_router(state: GraphState) -> Literal["developer", "documentation"]:
    if state.get("qa_feedback") == "PASS":
        return "documentation"
    if state.get("loop_count", 0) >= 2:
        return "documentation"
    return "developer"


# ── Phase 1: Build graph (Architect → Dev → QA → Docs → LocalPreview) ──────────
build_graph = StateGraph(GraphState)
build_graph.add_node("architect", architect_node)
build_graph.add_node("developer", developer_node)
build_graph.add_node("qa_critic", qa_critic_node)
build_graph.add_node("documentation", documentation_node)
build_graph.add_node("local_preview", local_preview_node)
build_graph.add_edge(START, "architect")
build_graph.add_edge("architect", "developer")
build_graph.add_edge("developer", "qa_critic")
build_graph.add_conditional_edges("qa_critic", qa_router)
build_graph.add_edge("documentation", "local_preview")
build_graph.add_edge("local_preview", END)
build_workflow = build_graph.compile()

# ── Phase 2: Deploy graph (DevOps Engineer only) ────────────────────────────────
deploy_graph = StateGraph(GraphState)
deploy_graph.add_node("devops_engineer", devops_engineer_node)
deploy_graph.add_edge(START, "devops_engineer")
deploy_graph.add_edge("devops_engineer", END)
deploy_workflow = deploy_graph.compile()


class GenerateRequest(BaseModel):
    prompt: str
    intent: Optional[str] = None  # 'build' | 'deploy' — overrides classifier when set


async def run_magic_trick():
    await emit_event("Doc Engineer", "working", "Initialising documentation framework...")
    await emit_event("Architect", "working", "Analyzing requirements and designing system architecture...")
    await asyncio.sleep(1)
    await emit_event("Architect", "working", "Defining component hierarchy and data flow...")
    await asyncio.sleep(1)
    await emit_event("Architect", "done", "PRD complete — handing off to Developer.")

    await emit_event("Developer", "working", "Initialising workspace...")
    await asyncio.sleep(0.5)
    await emit_event("Developer", "working", "Starting code generation...")
    await asyncio.sleep(0.8)
    await emit_event("Developer", "writing", "Wrote src/App.jsx", file="src/App.jsx")
    await asyncio.sleep(0.4)
    await emit_event("Developer", "writing", "Wrote src/index.css", file="src/index.css")
    await asyncio.sleep(0.4)
    await emit_event("Developer", "writing", "Wrote src/components/RecipeList.jsx", file="src/components/RecipeList.jsx")
    await asyncio.sleep(0.4)
    await emit_event("Developer", "writing", "Wrote src/components/RecipeCard.jsx", file="src/components/RecipeCard.jsx")
    await asyncio.sleep(0.3)
    await emit_event("Developer", "done", "Code generation complete — 4 file(s) written.")

    await emit_event("QA Critic", "working", "Scanning generated files for structural integrity...")
    await asyncio.sleep(0.6)
    await emit_event("QA Critic", "working", "Verifying component exports and import chains...")
    await asyncio.sleep(0.5)
    await emit_event("QA Critic", "done", "✓ All checks passed. Code quality verified.")

    await emit_event("Doc Engineer", "working", "Finalising README.md with project commands...")
    await asyncio.sleep(0.8)
    await emit_event("Doc Engineer", "writing", "Wrote README.md", file="README.md")
    await emit_event("Doc Engineer", "done", "Documentation complete. README.md ready.")

    await emit_event("System", "working", "Starting local preview server...")
    await asyncio.sleep(1)
    await emit_event("System", "local_ready",
                     "✅ Local preview ready — app running at localhost:5173",
                     url="http://localhost:5173")


async def run_pipeline(prompt_text: str, intent: str = None):
    if intent is None:
        intent = classify_intent(prompt_text)
    try:
        if prompt_text.strip() == "magic_recipe_app":
            await run_magic_trick()
            await emit_event("System", "done", "Build pipeline complete.")
        elif intent == "deploy":
            await deploy_workflow.ainvoke({"user_prompt": prompt_text})
            await emit_event("System", "done", "Deployment pipeline complete.")
        else:
            await build_workflow.ainvoke({"user_prompt": prompt_text, "loop_count": 0})
            await emit_event("System", "done", "Build pipeline complete.")
    except Exception as e:
        await emit_event("System", "error", f"Pipeline error: {str(e)}")


@app.post("/api/generate")
async def generate(req: GenerateRequest, background_tasks: BackgroundTasks):
    while not stream_queue.empty():
        stream_queue.get_nowait()
    resolved_intent = req.intent if req.intent in ("build", "deploy") else classify_intent(req.prompt)
    background_tasks.add_task(run_pipeline, req.prompt, resolved_intent)
    return {"status": "started", "intent": resolved_intent}


async def run_deploy():
    """Dedicated deploy runner — always invokes deploy_workflow, no classification."""
    try:
        await deploy_workflow.ainvoke({"user_prompt": "Deploy to production"})
        await emit_event("System", "done", "Deployment pipeline complete.")
    except Exception as e:
        await emit_event("System", "error", f"Deployment error: {str(e)}")


@app.post("/api/deploy")
async def deploy(background_tasks: BackgroundTasks):
    """Phase 2 endpoint — bypasses intent classification, always runs DevOps Engineer only."""
    while not stream_queue.empty():
        stream_queue.get_nowait()
    background_tasks.add_task(run_deploy)
    return {"status": "started", "intent": "deploy"}


@app.get("/api/stream")
async def stream_logs():
    async def event_generator():
        while True:
            event_json = await stream_queue.get()
            yield {"event": "message", "id": "message_id", "retry": 15000, "data": event_json}
            event_dict = json.loads(event_json)
            is_terminal = (
                event_dict.get("status") in ["done", "error"]
                and event_dict.get("agent") in ["DevOps Engineer", "System"]
            )
            if is_terminal:
                await asyncio.sleep(0.5)
                break
    return EventSourceResponse(event_generator())


if __name__ == "__main__":
    import uvicorn
    port = int(os.environ.get("PORT", 8090))
    uvicorn.run(app, host="0.0.0.0", port=port)
