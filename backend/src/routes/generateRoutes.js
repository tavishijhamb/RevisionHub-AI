const express = require("express");

const router = express.Router();

const {getSummary, getFlashcards, getQuiz} = require("../controllers/generateController");

router.post("/generate/summary", getSummary);

router.post("/generate/flashcards", getFlashcards);

router.post("/generate/quiz", getQuiz);

module.exports = router;