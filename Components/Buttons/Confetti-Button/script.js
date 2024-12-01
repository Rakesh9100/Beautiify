const confettiButton = document.querySelector('.confetti-button');

confettiButton.addEventListener('click', () => {
    const confettiCount = 80;
    const buttonRect = confettiButton.getBoundingClientRect();

    for (let i = 0; i < confettiCount; i++) {
        const confetti = document.createElement('div');
        confetti.classList.add('confetti');

        // Assign random shapes and sizes for variety
        const shapes = ['circle', 'square', 'triangle'];
        const shape = shapes[Math.floor(Math.random() * shapes.length)];

        if (shape === 'circle') {
            confetti.style.width = confetti.style.height = '12px';
            confetti.style.borderRadius = '50%';
        } else if (shape === 'square') {
            confetti.style.width = confetti.style.height = '10px';
        } else if (shape === 'triangle') {
            confetti.style.width = 0;
            confetti.style.height = 0;
            confetti.style.borderLeft = '5px solid transparent';
            confetti.style.borderRight = '5px solid transparent';
            confetti.style.borderBottom = `10px solid hsl(${Math.random() * 360}, 100%, 50%)`;
        }

        confetti.style.backgroundColor = `hsl(${Math.random() * 360}, 100%, 50%)`; // Random confetti colors
        confetti.style.left = `${buttonRect.left + buttonRect.width / 2}px`; // Start from center of button
        confetti.style.top = `${buttonRect.top + buttonRect.height / 2}px`; // Start from center of button

        // Random direction for X and Y
        confetti.style.setProperty('--x-direction', Math.random() - 0.5); // Horizontal spread
        confetti.style.setProperty('--y-direction', Math.random() - 0.5); // Initial upward/downward motion
        confetti.style.setProperty('--gravity', Math.random() * 1.2 + 0.4); // Simulate gravity to pull downward

        document.body.appendChild(confetti);

        // Confetti motion using GSAP
        gsap.to(confetti, {
            x: (Math.random() - 0.5) * 1200, // Spread horizontally
            y: (Math.random() - 0.5) * 1200, // Spread vertically
            rotation: Math.random() * 1440, // Spin confetti with more rotations
            duration: 2 + Math.random(), // Randomized duration for each piece
            opacity: 0,
            scale: Math.random() * 1.5 + 0.5, // Randomize size slightly
            onComplete: () => confetti.remove(), // Remove confetti after animation
        });
    }
});
