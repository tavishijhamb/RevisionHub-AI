const fileInput = document.querySelector("#pdf-upload");
const fileName = document.querySelector("#file-name");
const continueBtn = document.querySelector("#continue-btn");

let selectedFile = null;

continueBtn.disabled = true;

fileInput.addEventListener("change", function () {

    selectedFile = fileInput.files[0];

    if (!selectedFile) {
        fileName.innerText = "";
        continueBtn.disabled = true;
        return;
    }

    const maxSize = 20 * 1024 * 1024; // 20 MB

    if (selectedFile.size > maxSize) {
        alert("Please upload a PDF smaller than 20 MB.");

        fileInput.value = "";
        fileName.innerText = "";
        continueBtn.disabled = true;
        selectedFile = null;

        return;
    }

    fileName.innerText = "Selected File: " + selectedFile.name;
    continueBtn.disabled = false;

});

continueBtn.addEventListener("click", async function () {

    if (!selectedFile) {
        alert("Please select a PDF first.");
        return;
    }

    continueBtn.disabled = true;
    continueBtn.innerText = "Uploading...";

    try {

        const formData = new FormData();
        formData.append("pdf", selectedFile);

        const response = await fetch("http://localhost:5000/upload", {
            method: "POST",
            body: formData
        });

        if (!response.ok) {
            throw new Error("Backend returned status " + response.status);
        }

        const data = await response.json();

        sessionStorage.setItem("uploadedFile", data.file);

        window.location.href = "processing.html";

    } catch (error) {

        console.error("Upload Error:", error);
        alert("Upload failed. Please try again.");

        continueBtn.disabled = false;
        continueBtn.innerText = "Continue";

    }

});