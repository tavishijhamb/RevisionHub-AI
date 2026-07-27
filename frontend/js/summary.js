document.addEventListener("DOMContentLoaded", () => {

    const storedData = localStorage.getItem("studyResult");

    if (!storedData) {

        alert("No summary data found.");

        window.location.href = "dashboard.html";

        return;

    }

    const data = JSON.parse(storedData);

    const summaryList = document.getElementById("summary-list");

    summaryList.innerHTML = "";

    data.summary.forEach(point => {

        const li = document.createElement("li");

        li.textContent = point;

        summaryList.appendChild(li);

    });

});

document.querySelectorAll("a").forEach(link => {

    link.addEventListener("click", () => {

        localStorage.removeItem("studyResult");

    });

});

document.getElementById("download-btn").addEventListener("click", function (e) {

    e.preventDefault();

    const { jsPDF } = window.jspdf;

    const doc = new jsPDF();

    doc.setFontSize(20);
    doc.text("AI Generated Summary", 20, 20);

    doc.setFontSize(12);

    const points = document.querySelectorAll("#summary-list li");

    let y = 40;

    points.forEach((point) => {

        const text = "• " + point.innerText;

        const lines = doc.splitTextToSize(text, 170);

        doc.text(lines, 20, y);

        y += lines.length * 8;

        if (y > 270) {

            doc.addPage();

            y = 20;

        }

    });

    doc.save("AI_Study_Summary.pdf");

});