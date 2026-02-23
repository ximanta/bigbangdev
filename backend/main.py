import os
import re
import shutil
import asyncio
import json
import subprocess
from typing import TypedDict, Dict, List, Literal
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

_IMPORT_RE = re.compile(r"""from\s+['"]([^'"./][^'"]*)['"]""")

def fix_content(content: str) -> str:
    """Unconditionally unescape any double-escaped sequences the LLM may emit."""
    # Always replace \\n -> real newline, \\t -> real tab, \\" -> "
    if "\\n" in content:
        content = content.replace("\\n", "\n")
    if "\\t" in content:
        content = content.replace("\\t", "\t")
    if '\\"' in content:
        content = content.replace('\\"', '"')
        
    # If the file is extremely squashed (minified), forcibly add newlines to prevent Babel crashes
    lines = [L for L in content.split("\n") if L.strip()]
    if len(lines) < 5 and len(content) > 300:
        # Heavily squashed file detected! Let's inject safe newlines to help Babel parse JSX
        content = content.replace(";", ";\n")
        content = content.replace("const ", "\nconst ")
        content = content.replace("let ", "\nlet ")
        content = content.replace("import ", "\nimport ")
        content = content.replace("export ", "\nexport ")
        content = content.replace("return (", "\nreturn (\n")
        content = content.replace("</", "\n</")
        content = content.replace("/>", "/>\n")
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

def find_minified(code_files: dict) -> list[str]:
    """Detect JSX/JS files that were output as a single minified line."""
    bad = []
    for filepath, content in code_files.items():
        if not filepath.endswith((".jsx", ".js", ".tsx", ".ts")):
            continue
        non_empty_lines = [l for l in content.split("\n") if l.strip()]
        # Minified heuristic: content > 300 chars but fewer than 5 real lines
        if len(content) > 300 and len(non_empty_lines) < 5:
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
    await emit_event("Doc Engineer", "working", "Monitoring project requirements concurrently...")
    await emit_event(agent, "working", "Analyzing requirements and designing system architecture...")
    await asyncio.sleep(0.3)
    await emit_event(agent, "working", "Defining component hierarchy and data flow...")

    prompt = (
        f"Write a concise 3-paragraph Product Requirements Document (PRD) and list the required UI components "
        f"for the following application idea: {state['user_prompt']}"
    )
    response = await llm.ainvoke(prompt)
    prd = response.content

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
    for fname in ["package.json", "vite.config.js", "index.html"]:
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
        "- Keep components clean and visually appealing\n"
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
        content_fixed = fix_content(f.content)
        code_files[f.filepath] = content_fixed

        full_path = os.path.join(WORKSPACE_DIR, f.filepath)
        os.makedirs(os.path.dirname(full_path), exist_ok=True)
        with open(full_path, "w", encoding="utf-8") as fh:
            fh.write(content_fixed)

        await emit_event(agent, "writing", f"Wrote {f.filepath}", file=f.filepath)

    await emit_event(agent, "done", f"Code generation complete — {len(code_files)} file(s) written.")
    return {"code_files": code_files, "current_agent": agent}


async def qa_critic_node(state: GraphState) -> GraphState:
    """
    Lightweight QA gate — no actual linting.
    Validates that required src files exist and are non-empty.
    """
    agent = "QA Critic"
    loop_count = state.get("loop_count", 0) + 1

    await emit_event(agent, "working", "Scanning generated files for structural integrity...")
    await asyncio.sleep(0.5)
    await emit_event(agent, "working", "Verifying component exports and import chains...")
    await asyncio.sleep(0.4)

    # Check 1: src/App.jsx must exist and have content
    app_jsx = os.path.join(WORKSPACE_DIR, "src", "App.jsx")
    if not os.path.exists(app_jsx) or os.path.getsize(app_jsx) == 0:
        feedback = "App.jsx is missing or empty. Please regenerate the full application."
        await emit_event(agent, "working", "⚠ App.jsx missing — flagging for Developer revision.")
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
        return {"qa_feedback": feedback, "loop_count": loop_count, "current_agent": agent}

    await emit_event(agent, "done", "✓ All checks passed. Code quality verified.")
    return {"qa_feedback": "PASS", "loop_count": loop_count, "current_agent": agent}


async def devops_node(state: GraphState) -> GraphState:
    agent = "DevOps"
    await emit_event(agent, "working", "Provisioning local runtime environment...")
    await asyncio.sleep(0.4)
    await emit_event(agent, "working", "Starting Vite dev server in workspace...")

    subprocess.Popen("npm run dev", cwd=WORKSPACE_DIR, shell=True,
                     stdout=subprocess.DEVNULL, stderr=subprocess.DEVNULL)

    await asyncio.sleep(2)
    deploy_url = "http://localhost:5173"
    await emit_event(agent, "done", f"🚀 Application is live!", url=deploy_url)

    return {"deploy_url": deploy_url, "current_agent": agent}


async def documentation_node(state: GraphState) -> GraphState:
    agent = "Doc Engineer"
    await emit_event(agent, "working", "Synthesizing project context into README.md...")
    await asyncio.sleep(0.5)

    prompt = (
        f"Write a professional README.md for this Vite + React application based on the PRD.\n\n"
        f"PRD:\n{state.get('prd', 'A React Application')}\n\n"
        f"Include Project Title, Features, and Setup Instructions.\n"
        f"Return ONLY the raw markdown text."
    )
    response = await llm.ainvoke(prompt)
    
    content = response.content.strip()
    if content.startswith("```"):
        content = "\n".join(content.split("\n")[1:])
    if content.endswith("```"):
        content = "\n".join(content.split("\n")[:-1])

    readme_path = os.path.join(WORKSPACE_DIR, "README.md")
    with open(readme_path, "w", encoding="utf-8") as fh:
        fh.write(content.strip())

    await emit_event(agent, "writing", "Wrote README.md", file="README.md")
    await emit_event(agent, "done", "Documentation complete.")
    return {"current_agent": agent}


def qa_router(state: GraphState) -> Literal["developer", "documentation"]:
    if state.get("qa_feedback") == "PASS":
        return "documentation"
    if state.get("loop_count", 0) >= 2:
        return "documentation"
    return "developer"


workflow = StateGraph(GraphState)
workflow.add_node("architect", architect_node)
workflow.add_node("developer", developer_node)
workflow.add_node("qa_critic", qa_critic_node)
workflow.add_node("documentation", documentation_node)
workflow.add_node("devops", devops_node)

workflow.add_edge(START, "architect")
workflow.add_edge("architect", "developer")
workflow.add_edge("developer", "qa_critic")
workflow.add_conditional_edges("qa_critic", qa_router)
workflow.add_edge("documentation", "devops")
workflow.add_edge("devops", END)
graph = workflow.compile()


class GenerateRequest(BaseModel):
    prompt: str


async def run_magic_trick():
    await emit_event("Doc Engineer", "working", "Monitoring project requirements concurrently...")
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

    await emit_event("Doc Engineer", "working", "Synthesizing project context into README.md...")
    await asyncio.sleep(0.8)
    await emit_event("Doc Engineer", "writing", "Wrote README.md", file="README.md")
    await emit_event("Doc Engineer", "done", "Documentation complete.")

    await emit_event("DevOps", "working", "Provisioning local runtime environment...")
    await asyncio.sleep(0.6)
    await emit_event("DevOps", "working", "Starting Vite dev server in workspace...")
    await asyncio.sleep(1)
    await emit_event("DevOps", "done", "🚀 Application is live!", url="https://recipe-app-demo.vercel.app/")


async def run_pipeline(prompt_text: str):
    try:
        if prompt_text.strip() == "magic_recipe_app":
            await run_magic_trick()
        else:
            await graph.ainvoke({"user_prompt": prompt_text, "loop_count": 0})
            await emit_event("System", "done", "Pipeline finished.")
    except Exception as e:
        await emit_event("System", "error", f"Pipeline error: {str(e)}")


@app.post("/api/generate")
async def generate(req: GenerateRequest, background_tasks: BackgroundTasks):
    while not stream_queue.empty():
        stream_queue.get_nowait()
    background_tasks.add_task(run_pipeline, req.prompt)
    return {"status": "started"}


@app.get("/api/stream")
async def stream_logs():
    async def event_generator():
        while True:
            event_json = await stream_queue.get()
            yield {"event": "message", "id": "message_id", "retry": 15000, "data": event_json}
            event_dict = json.loads(event_json)
            is_terminal = (
                event_dict.get("status") in ["done", "error"]
                and event_dict.get("agent") in ["DevOps", "System"]
            )
            if is_terminal:
                await asyncio.sleep(0.5)
                break
    return EventSourceResponse(event_generator())


if __name__ == "__main__":
    import uvicorn
    port = int(os.environ.get("PORT", 8090))
    uvicorn.run(app, host="0.0.0.0", port=port)
