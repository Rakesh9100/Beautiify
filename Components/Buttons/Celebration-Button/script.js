document.addEventListener('DOMContentLoaded', () => {
    const button = document.getElementById('celebrateButton');
    const canvas = document.getElementById('confettiCanvas');
    const context = canvas.getContext('2d');
    const confettiElements = [];
    let isCelebrating = false;
    let animationFrameId;
  
    // Set canvas size
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  
    class Confetti {
      constructor(x, y) {
        this.x = x;
        this.y = y;
        this.size = Math.random() * 10 + 5;
        this.speed = 3.1; // Constant speed
        this.angle = Math.random() * 360;
        this.color = `hsl(${Math.random() * 360}, 100%, 50%)`;
      }
  
      update() {
        this.y += this.speed;
        this.angle += this.speed;
        if (this.y > canvas.height) {
          this.y = -10;
          this.x = Math.random() * canvas.width;
        }
      }
  
      draw() {
        context.fillStyle = this.color;
        context.beginPath();
        context.ellipse(this.x, this.y, this.size, this.size / 2, this.angle, 0, 2 * Math.PI);
        context.fill();
      }
    }
  
    function addConfetti() {
      for (let i = 0; i < 100; i++) {
        confettiElements.push(new Confetti(Math.random() * canvas.width, Math.random() * canvas.height));
      }
    }
  
    function animate() {
      context.clearRect(0, 0, canvas.width, canvas.height);
      confettiElements.forEach(confetti => {
        confetti.update();
        confetti.draw();
      });
      animationFrameId = requestAnimationFrame(animate);
    }
  
    function toggleConfetti() {
      if (isCelebrating) {
        // Stop the confetti
        cancelAnimationFrame(animationFrameId);
        context.clearRect(0, 0, canvas.width, canvas.height);
        confettiElements.length = 0; // Clear confetti elements
      } else {
        // Start the confetti
        addConfetti();
        animate();
      }
      isCelebrating = !isCelebrating;
    }
  
    button.addEventListener('click', toggleConfetti);
  });
  