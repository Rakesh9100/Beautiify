document.addEventListener("DOMContentLoaded", function () {
    const cardContainer = document.querySelector(".card-container");

    for (let i = 1; i <= 20; i++) {
        const card = document.createElement("div");
        card.classList.add("card");
        card.style.top = i + "rem"; // Position based on the loop index
        card.style.transform = "rotate(" + i + "deg)"; // Rotate based on the loop index

        const cardTitle = document.createElement("h2");
        cardTitle.textContent = "Card Title";

        const cardText = document.createElement("p");
        cardText.textContent = "Lorem ipsum dolor sit amet consectetur adipisicing elit. Eaque at nobis doloremque odit labore provident unde officiis odio sit sint? Vitae accusantium praesentium ullam alias aut quod cum perferendis maiores.";

        card.appendChild(cardTitle);
        card.appendChild(cardText);
        cardContainer.appendChild(card);
    }
});
