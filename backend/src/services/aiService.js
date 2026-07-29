const axios = require("axios");

const AI_SERVER = "http://127.0.0.1:8000";

const generateSummary = async (text) => {

    const response = await axios.post(
        `${AI_SERVER}/api/summary`,
        {
            raw_text: text
        }
    );

    return response.data;
};

const generateFlashcards = async (text) => {

    const response = await axios.post(
        `${AI_SERVER}/api/flashcards`,
        {
            raw_text: text
        }
    );

    return response.data;
};

const generateQuiz = async (text) => {

    const response = await axios.post(
        `${AI_SERVER}/api/quiz`,
        {
            raw_text: text
        }
    );

    return response.data;
};

module.exports = {generateSummary, generateFlashcards, generateQuiz};