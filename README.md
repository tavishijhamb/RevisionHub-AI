# RevisionHub AI

RevisionHub AI turns a PDF into ready-to-study material. Upload a document and the platform extracts its text, then generates AI-powered summaries, flashcards, and quizzes on demand — so you can revise faster instead of re-reading the whole file.

## How it works

1. **Upload** — Drop a PDF (up to 20 MB) into the web app.
2. **Fast ingestion** — The backend extracts the PDF's text and hands it off almost instantly, so you're never stuck waiting on a loading screen.
3. **On-demand generation** — From the dashboard, request a **Summary**, **Flashcards**, or a **Quiz**. Each is generated only when you ask for it, using Google Gemini.
4. **Study** — Review the generated content directly in the browser.

## Project structure

This is a three-part project:

| Folder | Description |
|---|---|
| [`frontend/`](./frontend) | Static HTML/CSS/JS web app — upload flow, dashboard, and the summary/flashcard/quiz views |
| [`backend/`](./backend) | Node.js + Express API — handles PDF upload, text extraction, and routes requests to the AI service |
| [`ai/`](./ai) | Python FastAPI service — generates summaries, flashcards, and quizzes with Google Gemini |

## Tech stack

- **Frontend:** HTML, CSS, vanilla JavaScript
- **Backend:** Node.js, Express, Multer, pdf-parse
- **AI service:** Python, FastAPI, Pydantic, Google Gemini (`google-genai`), pypdf

## Getting started

Each part of the app runs independently — see the README in `frontend/`, `backend/`, and `ai/` for setup and run instructions specific to that service.
