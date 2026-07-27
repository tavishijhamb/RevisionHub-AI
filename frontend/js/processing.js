document.addEventListener("DOMContentLoaded", () => {

    const steps = document.querySelectorAll(".progress-item");

    if (steps.length === 0) {
        console.error("No progress items found.");
        return;
    }

    let currentStep = 2;

    function nextStep() {

        if (currentStep >= steps.length) {
            clearInterval(interval);
            return;
        }

        // Complete current step
        steps[currentStep].classList.remove("active");
        steps[currentStep].classList.add("completed");

        const currentStatus = steps[currentStep].querySelector(".status");
        if (currentStatus) {
            currentStatus.innerText = "✔";
        }

        currentStep++;

        // Activate next step
        if (currentStep < steps.length) {

            steps[currentStep].classList.add("active");

            const nextStatus = steps[currentStep].querySelector(".status");
            if (nextStatus) {
                nextStatus.innerText = "⏳";
            }

        } else {

            clearInterval(interval);

            setTimeout(() => {
                window.location.href = "dashboard.html";
            }, 2000);

        }
    }

    const interval = setInterval(nextStep, 2000);

});