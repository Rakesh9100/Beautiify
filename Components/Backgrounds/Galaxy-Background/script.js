const canvas = document.getElementById('galaxyCanvas');
const ctx = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const stars = [];

class Star {
  constructor() {
    this.x = Math.random() * canvas.width;
    this.y = Math.random() * canvas.height;
    this.z = Math.random() * canvas.width;
    this.o = Math.random();
  }

  update() {
    this.z -= 2;
    if (this.z <= 0) {
      this.z = canvas.width;
    }
  }

  show() {
    const x = (this.x - canvas.width / 2) * (canvas.width / this.z);
    const y = (this.y - canvas.height / 2) * (canvas.width / this.z);
    const radius = canvas.width / this.z;
    ctx.beginPath();
    ctx.arc(
      x + canvas.width / 2,
      y + canvas.height / 2,
      radius,
      0,
      Math.PI * 2
    );
    ctx.fillStyle = `rgba(255, 255, 255, ${this.o})`;
    ctx.fill();
  }
}

function createStars(num) {
  for (let i = 0; i < num; i++) {
    stars.push(new Star());
  }
}

function animate() {
  ctx.fillStyle = 'rgba(0, 0, 0, 0.1)';
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  stars.forEach((star) => {
    star.update();
    star.show();
  });
  requestAnimationFrame(animate);
}

createStars(1000);
animate();

window.addEventListener('resize', () => {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  stars.length = 0;
  createStars(1000);
});
