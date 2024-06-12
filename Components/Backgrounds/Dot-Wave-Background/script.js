document.addEventListener("DOMContentLoaded", function() {
    const container = document.querySelector(".dot-container");
    const numRows = Math.ceil(window.innerHeight / 30);
    const numCols = Math.ceil(window.innerWidth / 30);

    const dots = [];

    // Create the dots and store their references
    for (let i = 0; i < numRows; i++) {
        const row = [];
        for (let j = 0; j < numCols; j++) {
            const dot = document.createElement("div");
            dot.classList.add("dot");
            container.appendChild(dot);
            row.push(dot);
        }
        dots.push(row);
    }

    // Function to calculate distance between two points
    function distance(x1, y1, x2, y2) {
        return Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2));
    }

    container.addEventListener('mousemove', function(event) {
        const mouseX = event.clientX;
        const mouseY = event.clientY;

        dots.forEach((row, i) => {
            row.forEach((dot, j) => {
                const dotX = dot.offsetLeft + dot.offsetWidth / 2;
                const dotY = dot.offsetTop + dot.offsetHeight / 2;

                const dist = distance(mouseX, mouseY, dotX, dotY);

                const maxDist = Math.min(window.innerWidth, window.innerHeight) / 5; // Adjust the divisor for smaller range
                const scale = 1 + 0.2 * Math.cos(Math.PI * dist / maxDist);

                dot.style.transform = `scale(${scale})`;
            });
        });
    });

    container.addEventListener('mouseout', function() {
        dots.forEach(row => {
            row.forEach(dot => {
                dot.style.transform = 'scale(1)';
            });
        });
    });
});
