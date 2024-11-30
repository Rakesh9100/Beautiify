document.addEventListener('DOMContentLoaded', () => {
    const cursorTrailLength = 20;
    const cursorElements = [];

    for (let i = 0; i < cursorTrailLength; i++) {
        const cursor = document.createElement('div');
        cursor.classList.add('cursor');
        cursor.style.transition = `transform ${0.05 * (i + 1)}s, box-shadow 0.2s`;
        document.body.appendChild(cursor);
        cursorElements.push(cursor);
    }

    let mouseX = window.innerWidth / 2;
    let mouseY = window.innerHeight / 2;

    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
    });

    function updateCursor() {
        cursorElements.forEach((cursor, index) => {
            const angle = (360 / cursorTrailLength) * index;
            const offsetX = 25 * Math.cos((angle * Math.PI) / 180);
            const offsetY = 25 * Math.sin((angle * Math.PI) / 180);
            cursor.style.transform = `translate(${mouseX + offsetX}px, ${mouseY + offsetY}px) rotate(${angle + 360}deg)`;
        });
        requestAnimationFrame(updateCursor);
    }

    updateCursor();
});
