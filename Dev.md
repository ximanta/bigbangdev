# Development Specification

## 1. Project Overview & Business Goal
The objective of this project is to build a highly visual **live stage demo** designed for executive leadership. It showcases a multi-agent AI system, orchestrated by LangGraph and powered by Google Gemini, that autonomously writes, tests, and deploys a web app from a simple text prompt (e.g., "A cooking recipe website").

**Core Constraints:**
- **Visuals over complex logic**: Fast feedback is critical (streaming text, UI interactions, step-by-step UI updates).
- **Demo Reliability**: Given the unpredictability of live demos with LLMs and networks, it requires a robust failsafe.
- **Speed**: We cannot install `node_modules` during the pipeline execution since `npm install` takes multiple minutes. 

## 2. Tech Stack Developed
- **Frontend**: Vite + React, Vanilla CSS. Runs locally on port 3001.
- **Backend Orchestrator**: FastAPI, Python, LangGraph. Runs locally (WSL compatible) on port 8090.
- **LLM**: Google Gemini (`gemini-2.5-flash`) structured outputs.
- **Local Application Deployment**: Auto-starts the generated app via `localhost:5173` through Python's `subprocess`.

## 3. The Implementation Setup
### 3.1 The "Boilerplate" Strategy
To optimize for speed, we pre-initialized a blank React application inside `backend/boilerplate` and performed a one-time `npm install`.
When the LangGraph pipeline is triggered, the backend orchestrator utilizes an instant non-blocking shell command (`cp -a` or `xcopy`) to clone the `boilerplate` into a fresh `workspace` directory. This creates a clean slate for the AI agents to write code into `workspace/src` without dragging the timeline scaling `node_modules`.

### 3.2 The Multi-Agent Pipeline (FastAPI & LangGraph)
We define the flow via `langgraph.graph.StateGraph` utilizing an `asyncio` execution loop to orchestrate four distinctive entities, sharing a common `GraphState` dictionary payload:

1. **Architect Node**:
   - Takes the raw user input.
   - Outputs a 3-paragraph Product Requirements Document (PRD), component strategy, and passes state downwards.
2. **Developer Node**:
   - Receives the PRD. 
   - Uses `with_structured_output` native to LangChain to safely emit pure JSON array objects with `filepath` and `content`.
   - Iterates and directly performs physical `os` file writes into `workspace/src` based on the AI's return. 
3. **QA Critic Node**:
   - Runs a blazing-fast CLI validation loop using `npm run lint`.
   - Captures any ESLint syntax errors via `stderr`/`stdout`.
   - Conditionally edges back to the **Developer Node** to rewrite errors safely up to a `loop_count` limit. If the check passes (or loops out), it branches into DevOps.
4. **DevOps Node**:
   - Initiates an async `subprocess.Popen` shell event to invoke `npm run dev` over the workspace.
   - Pushes the local hosting URL to the data stream.

### 3.3 The Frontend UI 
React acts as a Command Center mimicking a "Software Factory."
- **Communication layer**: Subscribes directly to `http://localhost:8090/api/stream` using the Server-Sent Events (SSE) `EventSource` standard. This creates a unilateral, highly persistent connection for chunked logs.
- **Visual Components**:
   - *Left Panel*: Iterates through active agent blocks and scales them natively using pure CSS active selectors when active.
   - *Middle Terminal*: Unpacks and maps the live event chunks over a visual CLI.
   - *Right Preview*: Displays conditional `<iframe src={deploy_url}>` dynamically based on the ultimate DevOps exit payload.

## 4. The Live Demo "Magic Trick"
To entirely mitigate the risk of internet failure mid-presentation, a backdoor exists.

If the speaker enters exactly `magic_recipe_app`, the backend deliberately skips calling `gemini-2.5-flash`. Instead, it fires `run_magic_trick()`, a synthetic routine loaded with `asyncio.sleep()` waits that perfectly mimics the exact sequence of LLM streams, writing files, checking code, terminating swiftly with a hardcoded, verified Vercel URL payload—guaranteeing success when on stage.
