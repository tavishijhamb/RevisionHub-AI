document.addEventListener("DOMContentLoaded", () => {

    const storedData = localStorage.getItem("studyResult");

    if (!storedData) {

        alert("No flashcards found.");

        window.location.href = "dashboard.html";

        return;

    }

    const data = JSON.parse(storedData);

    const flashcards = data.flashcards;

    let currentCard = 0;

    const questionText = document.getElementById("question-text");
    const answerText = document.getElementById("answer-text");

    const flashcardBox = document.querySelector(".flashcard-box");

    const cardNumber = document.getElementById("card-number");
    const cardPercent = document.getElementById("card-percent");
    const progressFill = document.getElementById("progress-fill");

    function updateCard() {

        questionText.textContent = flashcards[currentCard].question;
        answerText.textContent = flashcards[currentCard].answer;

        flashcardBox.classList.remove("flipped");

        cardNumber.textContent =
            `Card ${currentCard + 1} of ${flashcards.length}`;

        const percent =
            ((currentCard + 1) / flashcards.length) * 100;

        cardPercent.textContent = `${Math.round(percent)}%`;

        progressFill.style.width = `${percent}%`;

    }

    updateCard();

    document.getElementById("flipBtn").addEventListener("click", () => {

        flashcardBox.classList.toggle("flipped");

    });

    document.getElementById("nextBtn").addEventListener("click", () => {

        if (currentCard < flashcards.length - 1) {

            currentCard++;
            updateCard();

        }

    });

    document.getElementById("prevBtn").addEventListener("click", () => {

        if (currentCard > 0) {

            currentCard--;
            updateCard();

        }

    });

});

document.querySelectorAll("a").forEach(link => {

    link.addEventListener("click", () => {

        localStorage.removeItem("studyResult");

    });

});