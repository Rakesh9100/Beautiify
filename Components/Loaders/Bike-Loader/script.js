const bikeImages = document.querySelectorAll(".bike-image");
let currentIndex = 0;

setInterval(() => {
    bikeImages[currentIndex].style.opacity = "0";
    currentIndex = (currentIndex + 1) % bikeImages.length;
    bikeImages[currentIndex].style.opacity = "1";
}, 800);
