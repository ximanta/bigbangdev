# AI App Builder Demo (LangGraph + React)

This project contains a multi-agent AI system (using LangGraph/Python) that takes a generic user prompt and autonomously writes, tests, and deploys code into a React boilerplate application, with a visually streaming React frontend designed for live technical demonstrations.

## Prerequisites

- Node.js & npm (v20+ recommended)
- Python 3.10+ (via WSL is recommended on Windows)
- API Key from Google for Gemini Models

## Project Structure

- `frontend/`: The React (Vite) User Interface ("Command Center").
- `backend/`: The FastAPI Python backend running the LangGraph AI multi-agent pipeline.
- `backend/boilerplate/`: An essential blank React (Vite) template with pre-installed `node_modules`. Instead of letting the AI run `npm install` live, our pipeline swiftly copies this folder to `/workspace` before the AI overrides specific source files.
## Download

- Download the project from GitHub: `https://github.com/ximanta/bigbangdev.git

### Backend (`backend/.env`)
1. Create a `backend/.env` file (you can copy `.env.example`).
2. Add the following variables:
   ```env
   PORT=8090
   GEMINI_API_KEY=your_actual_google_gemini_api_key
   GEMINI_MODEL=gemini-2.5-flash
   ```

### Frontend (`frontend/.env`)
1. Create a `frontend/.env` file.
2. Add the following variable:
   ```env
   VITE_PORT=3001
   ```

## Setup & Running the Application

### 1. Backend (FastAPI + LangGraph)

Open a terminal (WSL/Ubuntu recommended) and navigate to the backend directory:

```bash
cd backend
```

If you are on WSL or Ubuntu, you may need to install the `venv` package first:
```bash
sudo apt update
sudo apt install python3-venv
```

Create and activate a virtual environment, then install dependencies:
```bash
python3 -m venv venv
source venv/bin/activate
pip install -r requirements.txt
```

Run the backend server:
```bash
python3 main.py
```


*The backend will be available at `http://localhost:8090`.*

### 2. Frontend (React UI)

Open a second terminal and navigate to the frontend directory:

```bash
cd frontend
```

Install dependencies and start the development server:
```bash
npm install
npm run dev
```
*The frontend will be available at `http://localhost:3001`.*

## Running the Demo

1. Open your browser and navigate to `http://localhost:3001`.
2. Type an application idea (e.g., "A modern todo list application") and click **Generate App**.