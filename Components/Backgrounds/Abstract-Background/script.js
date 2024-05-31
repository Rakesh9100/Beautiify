document.addEventListener("DOMContentLoaded", () => {
    let xPos = 0;
    let yPos = 0;
    const speed = 0.5; // Adjust the speed of the animation

    function animateBackground() {
        xPos -= speed;
        yPos -= speed;

        document.body.style.backgroundPosition = `${xPos}px ${yPos}px`;
        requestAnimationFrame(animateBackground);
    }

    animateBackground();
});
