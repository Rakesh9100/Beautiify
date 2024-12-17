const coords = {
    x: 0,
    y: 0
};
const circles = document.querySelectorAll(".circle");

const colors = [
    "#3A0088", "#5C0099", "#7D0CB3", "#9F49C6", "#C486D9",
    "#DEC2EB", "#F2E6FF", "#c38aff", "#ffd0e3", "#ffe5e8",
    "#c5415d", "#c03b5d", "#b22c5e", "#ac265e", "#9c155f",
    "#950f5f", "#830060", "#7c0060", "#680060", "#60005f"
];

circles.forEach(function (circle, index) {
    circle.x = 0;
    circle.y = 0;
    circle.style.backgroundColor = colors[index % colors.length];
});

function updateCursorPosition(x, y) {
    coords.x = x;
    coords.y = y;
}

window.addEventListener("mousemove", function (e) {
    updateCursorPosition(e.clientX, e.clientY);
});

window.addEventListener("touchstart", function (e) {
    const touch = e.touches[0];
    updateCursorPosition(touch.clientX, touch.clientY);
});

window.addEventListener("touchmove", function (e) {
    const touch = e.touches[0];
    updateCursorPosition(touch.clientX, touch.clientY);
});

function animateCircles() {
    let x = coords.x;
    let y = coords.y;

    circles.forEach(function (circle, index) {
        circle.style.left = x - 12 + "px";
        circle.style.top = y - 12 + "px";

        circle.style.scale = (circles.length - index) / circles.length;

        circle.x = x;
        circle.y = y;

        const nextCircle = circles[index + 1] || circles[0];
        x += (nextCircle.x - x) * 0.3;
        y += (nextCircle.y - y) * 0.3;
    });

    requestAnimationFrame(animateCircles);
}

animateCircles();