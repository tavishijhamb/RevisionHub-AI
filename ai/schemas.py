from pydantic import BaseModel
from typing import List

# ==========================================
# 1. DOCUMENT UPLOAD RESPONSE SCHEMA
# ==========================================

class UploadResponse(BaseModel):
    """
    Returned immediately after PDF ingestion to confirm 
    text extraction was successful and provide a session ID.
    """
    success: bool = True
    notebook_id: str
    filename: str
    character_count: int
    status: str


# ==========================================
# 2. SUMMARY GENERATION SCHEMA
# ==========================================

class SummarySchema(BaseModel):
    """
    Enforces Gemini to return summary key points as 
    a clean list of strings.
    """
    summary: List[str]


# ==========================================
# 3. FLASHCARD GENERATION SCHEMAS
# ==========================================

class Flashcard(BaseModel):
    """Single Q&A flashcard item."""
    question: str
    answer: str

class FlashcardSchema(BaseModel):
    """
    Enforces Gemini to return a collection of 
    structured Q&A flashcard objects.
    """
    flashcards: List[Flashcard]


# ==========================================
# 4. QUIZ GENERATION SCHEMAS
# ==========================================

class QuizQuestion(BaseModel):
    """Single multiple-choice quiz question item."""
    question: str
    options: List[str]
    answer: str

class QuizSchema(BaseModel):
    """
    Enforces Gemini to return a collection of 5 multiple-choice 
    quiz objects with 4 options and the correct answer.
    """
    quiz: List[QuizQuestion]