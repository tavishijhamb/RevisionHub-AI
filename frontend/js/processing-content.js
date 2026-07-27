document.addEventListener("DOMContentLoaded", () => {

    const steps = document.querySelectorAll(".progress-item");

    const title = document.getElementById("processing-title");
    const description = document.getElementById("processing-description");
    const currentStepText = document.getElementById("current-step");
    const nextStepText = document.getElementById("next-step");

    const params = new URLSearchParams(window.location.search);
    const type = params.get("type");

    if (type === "summary") {

        title.innerText = "Generating Summary";
        description.innerText =
            "Please wait while our AI generates a concise summary of your study material.";

        currentStepText.innerText = "Writing Summary";
        nextStepText.innerText = "Finalizing Summary";

    }

    else if (type === "flashcards") {

        title.innerText = "Creating Flashcards";
        description.innerText =
            "Please wait while our AI creates flashcards from your study material.";

        currentStepText.innerText = "Creating Flashcards";
        nextStepText.innerText = "Organizing Flashcards";

    }

    else if (type === "quiz") {

        title.innerText = "Generating Quiz";
        description.innerText =
            "Please wait while our AI creates quiz questions from your study material.";

        currentStepText.innerText = "Creating Quiz Questions";
        nextStepText.innerText = "Reviewing Questions";

    }

    let currentStep = 2;

    async function nextStep() {

        if (currentStep >= steps.length) {

            clearInterval(interval);
            return;

        }

        steps[currentStep].classList.remove("active");
        steps[currentStep].classList.add("completed");

        const status = steps[currentStep].querySelector(".status");

        if (status) {

            status.innerText = "✔";

        }

        currentStep++;

        if (currentStep < steps.length) {

            steps[currentStep].classList.add("active");

            const nextStatus = steps[currentStep].querySelector(".status");

            if (nextStatus) {

                nextStatus.innerText = "⏳";

            }

        }

        else {

            clearInterval(interval);

            try {

                const response = await fetch(
                    `http://localhost:5000/generate/${type}`,
                    {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json"
                        }
                    }
                );

                if (!response.ok) {
                    throw new Error("Backend generation failed.");
                }

                const data = await response.json();

                localStorage.setItem(
                    "studyResult",
                    JSON.stringify(data)
                );

                setTimeout(() => {

                    if (type === "summary") {

                        window.location.href = "summary.html";

                    }

                    else if (type === "flashcards") {

                        window.location.href = "flashcards.html";

                    }

                    else {

                        window.location.href = "quiz.html";

                    }

                }, 1000);

            }

            catch (err) {

                console.error(err);

                alert("Could not connect to backend.");

            }

        }

    }

    const interval = setInterval(nextStep, 2000);

});