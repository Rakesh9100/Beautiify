document.addEventListener('DOMContentLoaded', function () {
    const numDrops = 50;
    const bg = document.getElementById('background');

    for (let i = 0; i < numDrops; i++) {
        const drop = document.createElement('div');
        drop.className = 'raindrop';
        bg.appendChild(drop);

        const size = Math.random() * 10 + 2; // Random size between 2 and 12 px
        const duration = Math.random() * 2 + 1; // Random duration between 1 and 3 seconds
        const delay = Math.random() * 5; // Random delay between 0 and 5 seconds
        const x = Math.random() * window.innerWidth; // Random horizontal position
        const y = -Math.random() * window.innerHeight; // Start above viewport

        // Applying drop properties
        drop.style.width = `${size}px`;
        drop.style.height = `${size}px`;
        drop.style.left = `${x}px`;
        drop.style.animationDuration = `${duration}s`;
        drop.style.animationDelay = `${delay}s`;

        // Removing drop after animation
        drop.addEventListener('animationend', function () {
            drop.remove();
        });
    }
});
