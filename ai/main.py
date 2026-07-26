import os
import uuid
import pypdf
from typing import List
from pydantic import BaseModel
from fastapi import FastAPI, UploadFile, File, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from google import genai
from google.genai import types

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
# Make sure your API key is exported in terminal: export GEMINI_API_KEY="your-key"
client = genai.Client()

# TEMPORARY IN-MEMORY STORE (Person B will replace this with MongoDB)
# Stores notebooks as: { notebook_id: {"filename": str, "raw_text": str} }
notebooks_db = {}


# ==========================================
# 2. PYDANTIC SCHEMAS (Matches API Contract)
# ==========================================

# --- Upload Response ---
class UploadResponse(BaseModel):
    success: bool = True
    notebook_id: str
    filename: str
    character_count: int
    status: str

# --- Summary Schema ---
class SummarySchema(BaseModel):
    summary: List[str]

# --- Flashcard Schemas ---
class Flashcard(BaseModel):
    question: str
    answer: str

class FlashcardSchema(BaseModel):
    flashcards: List[Flashcard]

# --- Quiz Schemas ---
class QuizQuestion(BaseModel):
    question: str
    options: List[str]
    answer: str

class QuizSchema(BaseModel):
    quiz: List[QuizQuestion]


# ==========================================
# 3. HELPER FUNCTIONS
# ==========================================

def extract_text_from_pdf(file_bytes) -> str:
    """Extracts raw text content from an uploaded PDF file."""
    reader = pypdf.PdfReader(file_bytes)
    extracted_text = ""
    for page in reader.pages:
        text = page.extract_text()
        if text:
            extracted_text += text + "\n"
    return extracted_text


# ==========================================
# 4. ENDPOINTS
# ==========================================

# STAGE 1: FAST DOCUMENT INGESTION
@app.post("/api/notebooks/upload", response_model=UploadResponse)
async def upload_document(file: UploadFile = File(...)):
    """
    STAGE 1: Accepts PDF, extracts raw text instantly, saves it under a notebook ID, 
    and sends the user straight to the dashboard.
    """
    if not file.filename.endswith('.pdf'):
        raise HTTPException(status_code=400, detail="Only PDF files are supported.")
    
    # 1. Extract raw text
    text_content = extract_text_from_pdf(file.file)
    if not text_content.strip():
        raise HTTPException(status_code=400, detail="Could not read text from PDF.")

    # 2. Generate a unique ID for this notebook session
    notebook_id = str(uuid.uuid4())

    # 3. Store raw text (In-memory for now; Person B connects this to MongoDB)
    notebooks_db[notebook_id] = {
        "filename": file.filename,
        "raw_text": text_content
    }

    # 4. Return fast so the UI opens the Dashboard instantly
    return UploadResponse(
        success=True,
        notebook_id=notebook_id,
        filename=file.filename,
        character_count=len(text_content),
        status="ready"
    )


# STAGE 2: ON-DEMAND SUMMARY GENERATION
@app.post("/api/notebooks/{notebook_id}/summary")
async def generate_summary(notebook_id: str):
    """
    Generates bullet points matching Person A's requested format:
    { "success": True, "summary": ["...", "..."] }
    """
    if notebook_id not in notebooks_db:
        raise HTTPException(status_code=404, detail="Notebook not found.")

    raw_text = notebooks_db[notebook_id]["raw_text"]
    prompt = f"Provide a list of key summary points from the following text:\n\n{raw_text}"

    response = client.models.generate_content(
        model='gemini-2.5-flash',
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
@app.post("/api/notebooks/{notebook_id}/flashcards")
async def generate_flashcards(notebook_id: str):
    """
    Generates flashcards matching Person A's requested format:
    { "success": True, "flashcards": [{"question": "...", "answer": "..."}] }
    """
    if notebook_id not in notebooks_db:
        raise HTTPException(status_code=404, detail="Notebook not found.")

    raw_text = notebooks_db[notebook_id]["raw_text"]
    prompt = f"Generate 5 key flashcards (question and concise answer) from this text:\n\n{raw_text}"

    response = client.models.generate_content(
        model='gemini-2.5-flash',
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


# STAGE 2: ON-DEMAND QUIZ GENERATION
@app.post("/api/notebooks/{notebook_id}/quiz")
async def generate_quiz(notebook_id: str):
    """
    Generates quiz matching Person A's requested format:
    { "success": True, "quiz": [{"question": "...", "options": [...], "answer": "..."}] }
    """
    if notebook_id not in notebooks_db:
        raise HTTPException(status_code=404, detail="Notebook not found.")

    raw_text = notebooks_db[notebook_id]["raw_text"]
    prompt = f"Generate a 5-question multiple-choice quiz with 4 options and the exact correct answer string from this text:\n\n{raw_text}"

    response = client.models.generate_content(
        model='gemini-2.5-flash',
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