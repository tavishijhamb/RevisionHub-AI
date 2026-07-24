const fileInput = document.querySelector("#pdf-upload");
const fileName = document.querySelector("#file-name");
const continueBtn = document.querySelector("#continue-btn");

continueBtn.disabled = true;

fileInput.addEventListener("change", function () {

    const selectedFile = fileInput.files[0];

    if (!selectedFile) {
        fileName.innerText = "";
        continueBtn.disabled = true;
        return;
    }

    fileName.innerText = "Selected File: " + selectedFile.name;
    continueBtn.disabled = false;

});

continueBtn.addEventListener("click", function () {
    
    setTimeout(function () {
        window.location.href = "processing.html";
    }, 1000);

});