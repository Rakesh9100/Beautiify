const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const colors = ['#FF5733', '#FFBD33', '#33FF57', '#33C5FF', '#7A33FF', '#FF33E9', '#FFE233'];

class Particle {
    constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.vx = Math.random() * 2 - 1;
        this.vy = Math.random() * 2 - 1;
        this.size = Math.random() * 3 + 1;
        this.color = colors[Math.floor(Math.random() * colors.length)];
    }

    update() {
        this.x += this.vx;
        this.y += this.vy;

        // Bounce off walls
        if (this.x < 0 || this.x > canvas.width) {
            this.vx *= -1;
        }
        if (this.y < 0 || this.y > canvas.height) {
            this.vy *= -1;
        }
    }

    draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fillStyle = this.color; // Particle color
        ctx.fill();
    }
}

// Create particles
const particles = [];
for (let i = 0; i < 100; i++) {
    particles.push(new Particle());
}

// Animation loop
function animate() {
    requestAnimationFrame(animate);
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    particles.forEach(particle => {
        particle.update();
        particle.draw();
    });
}

animate();
