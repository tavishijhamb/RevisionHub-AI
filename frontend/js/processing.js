const steps = document.querySelectorAll(".progress-item");

let currentStep = 2;

// Function to move to the next step
function nextStep() {

    // Complete current step
    steps[currentStep].classList.remove("active");
    steps[currentStep].classList.add("completed");
    steps[currentStep].querySelector(".status").innerText = "✔";

    currentStep++;

    // If another step exists, make it active
    if (currentStep < steps.length) {

        steps[currentStep].classList.add("active");
        steps[currentStep].querySelector(".status").innerText = "⏳";

    }

    // If all steps are finished, redirect
    else {

        setTimeout(() => {
            window.location.href = "dashboard.html";
        }, 2000);

    }
}

const interval = setInterval(nextStep, 2000);