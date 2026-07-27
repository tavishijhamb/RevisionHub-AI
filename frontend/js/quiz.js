document.addEventListener("DOMContentLoaded", () => {

    const storedData = localStorage.getItem("studyResult");

    if (!storedData) {

        alert("No quiz data found.");

        window.location.href = "dashboard.html";

        return;

    }

    const data = JSON.parse(storedData);

    const quiz = data.quiz;

    let currentQuestion = 0;
    let score = 0;

    // Store user's selected answers
    const selectedAnswers = new Array(quiz.length).fill(null);

    const questionNumber = document.getElementById("question-number");
    const questionText = document.getElementById("question-text");

    const progressFill = document.getElementById("progress-fill");

    const option1 = document.getElementById("option1-text");
    const option2 = document.getElementById("option2-text");
    const option3 = document.getElementById("option3-text");
    const option4 = document.getElementById("option4-text");

    const radioButtons = document.querySelectorAll('input[name="answer"]');

    const quizCard = document.getElementById("quiz-card");
    const resultCard = document.getElementById("result-card");

    const nextBtn = document.getElementById("next-btn");
    const prevBtn = document.getElementById("prev-btn");

    function loadQuestion() {

        const q = quiz[currentQuestion];

        questionNumber.textContent =
            `Question ${currentQuestion + 1} of ${quiz.length}`;

        questionText.textContent = q.question;

        option1.textContent = q.options[0];
        option2.textContent = q.options[1];
        option3.textContent = q.options[2];
        option4.textContent = q.options[3];

        radioButtons.forEach(radio => radio.checked = false);

        if (selectedAnswers[currentQuestion] !== null) {

            radioButtons[selectedAnswers[currentQuestion]].checked = true;

        }

        progressFill.style.width =
            `${((currentQuestion + 1) / quiz.length) * 100}%`;

        prevBtn.disabled = currentQuestion === 0;

        if (currentQuestion === quiz.length - 1) {

            nextBtn.textContent = "Finish Quiz";

        } else {

            nextBtn.textContent = "Next";

        }

    }

    radioButtons.forEach((radio, index) => {

        radio.addEventListener("change", () => {

            selectedAnswers[currentQuestion] = index;

        });

    });

    nextBtn.addEventListener("click", () => {

        if (selectedAnswers[currentQuestion] === null) {

            alert("Please select an answer.");

            return;

        }

        if (currentQuestion < quiz.length - 1) {

            currentQuestion++;

            loadQuestion();

        }

        else {

            calculateScore();

        }

    });

    prevBtn.addEventListener("click", () => {

        if (currentQuestion > 0) {

            currentQuestion--;

            loadQuestion();

        }

    });

    function calculateScore() {

        score = 0;

        quiz.forEach((question, index) => {

            if (
                question.options[selectedAnswers[index]] === question.answer
            ) {

                score++;

            }

        });

        quizCard.style.display = "none";

        resultCard.style.display = "block";

        document.getElementById("score").textContent =
            `${score} / ${quiz.length}`;

        document.getElementById("correct").textContent = score;

        document.getElementById("incorrect").textContent =
            quiz.length - score;

        if (score === quiz.length) {

            document.getElementById("message").textContent =
                "Perfect Score! 🎉";

        }

        else if (score >= quiz.length / 2) {

            document.getElementById("message").textContent =
                "Great Job! 👍";

        }

        else {

            document.getElementById("message").textContent =
                "Keep Practicing! 📚";

        }

    }

    document.getElementById("retake-btn").addEventListener("click", () => {

        currentQuestion = 0;

        score = 0;

        selectedAnswers.fill(null);

        resultCard.style.display = "none";

        quizCard.style.display = "block";

        loadQuestion();

    });

    loadQuestion();

});