function createBubble() {
    const bubble = document.createElement("div");
    bubble.classList.add("bubble");
    document.body.appendChild(bubble);

    const size = Math.random() * 30 + 10 + "px";
    bubble.style.width = size;
    bubble.style.height = size;
    bubble.style.left = Math.random() * 100 + "vw";
    bubble.style.animationDuration = Math.random() * 5 + 3 + "s";

    setTimeout(() => {
        bubble.remove();
    }, 8000);
}

setInterval(createBubble, 500);