import os
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from google import genai
from google.genai import types
from dotenv import load_dotenv
from schemas import (
    TextUploadRequest,
    SummarySchema,
    FlashcardSchema,
    QuizSchema
)

# ==========================================
# 1. INITIALIZE FASTAPI & GEMINI
# ==========================================

app = FastAPI(title="Study Notebook AI Backend")

# Enable CORS so Person A's HTML/JS can connect seamlessly
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Initialize Google Gemini Client
load_dotenv()
client = genai.Client(
    api_key=os.getenv("GEMINI_API_KEY")
)

# ==========================================
# 2. ENDPOINTS
# ==========================================

# STAGE 1: ON-DEMAND SUMMARY GENERATION
@app.post("/api/summary")
async def generate_summary(request: TextUploadRequest):
    """
    Generates bullet points matching Person A's requested format:
    { "success": True, "summary": ["...", "..."] }
    """
    raw_text = request.raw_text
    prompt = f"Provide a list of key summary points from the following text:\n\n{raw_text}"

    response = client.models.generate_content(
        model='gemini-flash-latest',
        contents=prompt,
        config=types.GenerateContentConfig(
            response_mime_type="application/json",
            response_schema=SummarySchema,
        )
    )

    data = response.parsed.model_dump()
    return {
        "success": True,
        "summary": data["summary"]
    }


# STAGE 2: ON-DEMAND FLASHCARD GENERATION
@app.post("/api/flashcards")
async def generate_flashcards(request: TextUploadRequest):
    """
    Generates flashcards matching Person A's requested format:
    { "success": True, "flashcards": [{"question": "...", "answer": "..."}] }
    """
    raw_text = request.raw_text
    prompt = f"Generate 5 key flashcards (question and concise answer) from this text:\n\n{raw_text}"

    response = client.models.generate_content(
        model='gemini-flash-latest',
        contents=prompt,
        config=types.GenerateContentConfig(
            response_mime_type="application/json",
            response_schema=FlashcardSchema,
        )
    )

    data = response.parsed.model_dump()
    return {
        "success": True,
        "flashcards": data["flashcards"]
    }


# STAGE 3: ON-DEMAND QUIZ GENERATION
@app.post("/api/quiz")
async def generate_quiz(request: TextUploadRequest):
    """
    Generates quiz matching Person A's requested format:
    { "success": True, "quiz": [{"question": "...", "options": [...], "answer": "..."}] }
    """
    raw_text = request.raw_text
    prompt = f"Generate a 5-question multiple-choice quiz with 4 options and the exact correct answer string from this text:\n\n{raw_text}"

    response = client.models.generate_content(
        model='gemini-flash-latest',
        contents=prompt,
        config=types.GenerateContentConfig(
            response_mime_type="application/json",
            response_schema=QuizSchema,
        )
    )

    data = response.parsed.model_dump()
    return {
        "success": True,
        "quiz": data["quiz"]
    }