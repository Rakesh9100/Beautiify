const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let particles = [];
const colors = ['rgba(255,255,255,0.1)', 'rgba(200,200,200,0.1)', 'rgba(150,150,150,0.1)', 'rgba(100,100,100,0.1)'];

class Particle {
    constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.size = Math.random() * 20 + 10;
        this.color = colors[Math.floor(Math.random() * colors.length)];
        this.speedX = Math.random() * 0.5 - 0.25;
        this.speedY = Math.random() * 0.5 - 0.25;
    }

    update() {
        this.x += this.speedX;
        this.y += this.speedY;

        if (this.size > 0.5) this.size -= 0.05;
    }

    draw() {
        ctx.fillStyle = this.color;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.closePath();
        ctx.fill();
    }
}

function initParticles() {
    for (let i = 0; i < 100; i++) {
        particles.push(new Particle());
    }
}

function handleParticles() {
    for (let i = 0; i < particles.length; i++) {
        particles[i].update();
        particles[i].draw();

        if (particles[i].size <= 0.5) {
            particles[i] = new Particle();
        }
    }
}

function animate() {
    ctx.fillStyle = 'rgba(0, 0, 0, 0.1)'; // Lightly clear the canvas to create a fading effect
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    handleParticles();
    requestAnimationFrame(animate);
}

initParticles();
animate();
