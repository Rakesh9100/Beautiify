const button = document.querySelector('.fizzy-button');

button.addEventListener('click', () => {
    const particleCount = 100; // Large number of particles for extra fizz
    const bodyRect = document.body.getBoundingClientRect();

    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.classList.add('particle');
        particle.style.width = particle.style.height = `${Math.random() * 15 + 5}px`;
        particle.style.backgroundColor = `hsl(${Math.random() * 360}, 100%, 50%)`;

        // Particles can appear anywhere on the screen
        particle.style.left = `${Math.random() * window.innerWidth}px`;
        particle.style.top = `${Math.random() * window.innerHeight}px`;

        document.body.appendChild(particle);

        gsap.to(particle, {
            x: (Math.random() - 0.5) * 1000, // Bigger spread for a wider fizz effect
            y: (Math.random() - 0.5) * 1000,
            duration: 2,
            opacity: 0,
            scale: Math.random() * 2.5 + 1,
            onComplete: () => particle.remove(),
        });
    }
});
