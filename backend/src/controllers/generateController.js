exports.getSummary = (req, res) => {

    res.json({
        success: true,
        summary: [
            "Operating Systems manage computer hardware and software resources.",
            "Processes are programs currently executing.",
            "CPU scheduling improves performance.",
            "Memory management uses paging and segmentation.",
            "Deadlocks occur when processes wait indefinitely."
        ]
    });

};

exports.getFlashcards = (req, res) => {

    res.json({
        success: true,
        flashcards: [
            {
                question: "What is Artificial Intelligence?",
                answer: "Artificial Intelligence is the simulation of human intelligence in machines."
            },
            {
                question: "What is Machine Learning?",
                answer: "Machine Learning is a subset of AI that enables systems to learn from data."
            },
            {
                question: "What is Deep Learning?",
                answer: "Deep Learning uses neural networks with multiple layers to solve complex problems."
            }
        ]
    });

};

exports.getQuiz = (req, res) => {

    res.json({
        success: true,
        quiz: [
            {
                question: "Which software manages computer hardware?",
                options: [
                    "Compiler",
                    "Operating System",
                    "Browser",
                    "Database"
                ],
                answer: "Operating System"
            },
            {
                question: "Which is a programming language?",
                options: [
                    "Python",
                    "Windows",
                    "Chrome",
                    "Linux"
                ],
                answer: "Python"
            },
            {
                question: "CPU stands for?",
                options: [
                    "Central Processing Unit",
                    "Computer Processing Unit",
                    "Central Program Unit",
                    "Computer Program Utility"
                ],
                answer: "Central Processing Unit"
            }
        ]
    });

};