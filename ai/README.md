AI integration files will be added here.


# 🧠 Study Notebook AI Engine (AI)

Welcome to the backend and AI orchestration pipeline for the **Study Notebook Platform**. This service handles PDF text extraction, document ingestion, and structured AI generation (Summaries, Flashcards, and Quizzes) powered by **FastAPI** and **Google Gemini 2.5 Flash**.

---

## 🏗️ Architecture Overview

The backend uses a **2-stage workflow** to ensure a fast, responsive user experience:

1. **Stage 1 (Fast Ingestion):** Accepts PDF uploads, extracts text asynchronously using `pypdf`, assigns a unique `notebook_id`, and returns a readiness status instantly (~1 second).
2. **Stage 2 (On-Demand AI Generation):** Generates structured content via Gemini 2.5 Flash only when requested by the user (*Summary*, *Flashcards*, or *Quiz*).

[ Upload PDF ] ➔ [ Fast Ingestion ] ➔ [ Dashboard Ready ] ➔ [ On-Demand AI Generation ]

---

## 📁 Repository Structure

```text
├── schemas.py       # Pydantic data validation schemas (API Contract)
├── main.py          # FastAPI application, PDF parser & Gemini integration
├── requirements.txt # Python dependencies
└── README.md        # AI Engine documentation