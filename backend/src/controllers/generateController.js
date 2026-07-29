const { getExtractedText } = require("../data/studyData");

const {generateSummary, generateFlashcards, generateQuiz} = require("../services/aiService");

const getSummary = async (req, res) => {

    try {

        const text = getExtractedText();

        if (!text) {
            return res.status(400).json({
                success: false,
                message: "No PDF uploaded yet."
            });
        }

        const result = await generateSummary(text);

        res.status(200).json(result);

    } catch (err) {

        console.error("Summary Error:", err);

        res.status(500).json({
            success: false,
            message: "Summary generation failed."
        });

    }

};

const getFlashcards = async (req, res) => {

    try {

        const text = getExtractedText();

        if (!text) {
            return res.status(400).json({
                success: false,
                message: "No PDF uploaded yet."
            });
        }

        const result = await generateFlashcards(text);

        res.status(200).json(result);

    } catch (err) {

        console.error("Flashcards Error:", err);

        res.status(500).json({
            success: false,
            message: "Flashcard generation failed."
        });

    }

};

const getQuiz = async (req, res) => {

    try {

        const text = getExtractedText();

        if (!text) {
            return res.status(400).json({
                success: false,
                message: "No PDF uploaded yet."
            });
        }

        const result = await generateQuiz(text);

        res.status(200).json(result);

    } catch (err) {

        console.error("Quiz Error:", err);

        res.status(500).json({
            success: false,
            message: "Quiz generation failed."
        });

    }

};

module.exports = {getSummary, getFlashcards, getQuiz};