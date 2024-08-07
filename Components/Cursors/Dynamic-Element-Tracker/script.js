const cursorDot = document.getElementById('cursor-dot');
const cursorCircle = document.getElementById('cursor-circle');

let isHovering = false;

document.addEventListener('mousemove', (e) => {
    gsap.to(cursorDot, {
        x: e.clientX,
        y: e.clientY,
        duration: 0.1,
    });
    if (!isHovering) {
        gsap.to(cursorCircle, {
            x: e.clientX,
            y: e.clientY,
            duration: 0.3,
        });
    }
});

document.querySelectorAll('a, button').forEach((elem) => {
    elem.addEventListener('mouseenter', () => {
        isHovering = true;
        const rect = elem.getBoundingClientRect();
        const borderRadius = elem.tagName.toLowerCase() === 'button' ? '5px' : '50%';
        gsap.to(cursorCircle, {
            width: rect.width,
            height: rect.height,
            borderRadius: borderRadius,
            x: rect.left + rect.width / 2,
            y: rect.top + rect.height / 2,
            duration: 0.3,
        });
    });
    elem.addEventListener('mouseleave', () => {
        isHovering = false;
        gsap.to(cursorCircle, {
            width: 50,
            height: 50,
            borderRadius: '50%',
            duration: 0.3,
        });
    });
});
