# 🧠 Study Notebook AI Engine (AI)

Welcome to the backend and AI orchestration pipeline for the **Study Notebook Platform**. This service handles PDF text extraction, document ingestion, and structured AI generation (Summaries, Flashcards, and Quizzes) powered by **FastAPI** and **Google Gemini 2.5 Flash**.

---

## 🏗️ Architecture Overview

The backend uses a **2-stage workflow** to ensure a fast, responsive user experience:

1. **Stage 1 (Fast Ingestion):** Accepts PDF uploads, extracts text asynchronously using `pypdf`, assigns a unique `notebook_id`, and returns a readiness status instantly (~1 second).
2. **Stage 2 (On-Demand AI Generation):** Generates structured content via Gemini 2.5 Flash only when requested by the user (*Summary*, *Flashcards*, or *Quiz*).

`[ Upload PDF ]` ➔ `[ Fast Ingestion ]` ➔ `[ Dashboard Ready ]` ➔ `[ On-Demand AI Generation ]`

---

## 📁 Repository Structure

```text
├── schemas.py       # Pydantic data validation schemas (API Contract)
├── main.py          # FastAPI application, PDF parser & Gemini integration
├── requirements.txt # Python dependencies
└── README.md        # AI Engine documentation
```

---

## 🔌 Endpoints

| Method | Route | Description |
|---|---|---|
| `POST` | `/api/summary` | Generates a list of key bullet-point summaries from the provided text |
| `POST` | `/api/flashcards` | Generates a set of question/answer flashcards from the provided text |
| `POST` | `/api/quiz` | Generates 5 multiple-choice questions (with answers) from the provided text |

All three accept a JSON body of `{ "raw_text": "..." }` and return Gemini output validated against a Pydantic schema, so the shape of the response is always consistent.

---

## ⚙️ Setup

```bash
pip install -r requirements.txt
```

Create a `.env` file with your Gemini API key:

```
GEMINI_API_KEY=your_key_here
```

## ▶️ Running locally

```bash
uvicorn main:app --reload
```
