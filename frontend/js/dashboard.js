const cards = document.querySelectorAll(".study-card");

cards.forEach(card => {

    card.addEventListener("click", function (event) {

        event.preventDefault();

        const type = new URL(card.href).searchParams.get("type");

        window.location.href = `processing-content.html?type=${type}`;

    });

});