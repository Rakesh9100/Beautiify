const container = document.querySelector(".container");
const searchIcons = document.querySelectorAll(".search-bar i");

searchIcons.forEach((searchIcon) => {
    searchIcon.addEventListener("click", () => {
        container.classList.toggle("change");
    });
});
