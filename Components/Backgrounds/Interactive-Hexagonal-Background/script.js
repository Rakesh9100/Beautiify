// PARTICLES
const cvs = document.getElementById('particles');
const ctx = cvs.getContext('2d');

cvs.width = window.innerWidth;
cvs.height = window.innerHeight;

let particlesArray;

let mouse = {
    x: null,
    y: null,
    radius: 170
}

window.addEventListener('mousemove', function (event) {
    mouse.x = event.x;
    mouse.y = event.y;
    mouse.radius = 170;
    console.log(mouse.radius);
});

document.onmousemove = (function (event) {
    var onmousestop = function () {
        mouse.radius = 0;
    }, thread;

    return function () {
        clearTimeout(thread);
        thread = setTimeout(onmousestop, 10);
    };
})();


class Particle {
    constructor(x, y, directionX, directionY, size, color) {
        this.x = x;
        this.y = y;
        this.directionX = directionX;
        this.directionY = directionY;
        this.size = size;
        this.color = color;
    }

    draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2, false);
        ctx.fillStyle = '#72C100';
        ctx.fill();
    }

    update() {
        if (this.x > cvs.width || this.x < 0) {
            this.directionX = -this.directionX;
        }

        if (this.y > cvs.height || this.y < 0) {
            this.directionY = -this.directionY;
        }

        let dx = mouse.x - this.x;
        let dy = mouse.y - this.y;
        let distance = Math.sqrt(dx * dx + dy * dy);
        if (distance < mouse.radius + this.size) {
            if (mouse.x < this.x && this.x < cvs.width - this.size * 10) {
                this.x += 10;
            }

            if (mouse.x > this.x && this.x > this.size * 10) {
                this.x -= 10;
            }

            if (mouse.y < this.y && this.y < cvs.height - this.size * 10) {
                this.y += 10;
            }

            if (mouse.y > this.y && this.y > this.size * 10) {
                this.y -= 10;
            }
        }
        this.x += this.directionX;
        this.y += this.directionY;

        this.draw();
    }
}

function init() {
    particlesArray = [];
    let numberOfParticles = (cvs.height * cvs.width) / 9000;
    for (let i = 0; i < numberOfParticles * 0.25; i++) {
        let size = (Math.random() * 35) + 1;
        let x = (Math.random() * ((innerWidth - size * 2) - (size * 2)) + size * 2);
        let y = (Math.random() * ((innerWidth - size * 2) - (size * 2)) + size * 2);
        let directionX = (Math.random() * 5) - 2.5;
        let directionY = (Math.random() * 5) - 2.5;
        let color = '#72C100';
        particlesArray.push(new Particle(x, y, directionX, directionY, size, color));
    }
}

function connect() {
    let opacityValue = 1;
    for (let i = 0; i < particlesArray.length; i++) {
        for (let j = i; j < particlesArray.length; j++) {
            let distance = ((particlesArray[i].x - particlesArray[j].x) * (particlesArray[i].x - particlesArray[j].x)) + ((particlesArray[i].y - particlesArray[j].y) * (particlesArray[i].y - particlesArray[j].y));

            if (distance < (cvs.width / 7) * (cvs.height / 7)) {
                opacityValue = 1 - (distance / 20000);
                ctx.strokeStyle = 'rgba(159, 253, 50,' + opacityValue + ')';
                ctx.lineWidth = 1;
                ctx.beginPath();
                ctx.moveTo(particlesArray[i].x, particlesArray[i].y);
                ctx.lineTo(particlesArray[j].x, particlesArray[j].y);
                ctx.stroke();
            }
        }
    }
}

function animate() {
    requestAnimationFrame(animate);
    ctx.clearRect(0, 0, innerWidth, innerHeight);
    for (let i = 0; i < particlesArray.length; i++) {
        particlesArray[i].update();
    }
    connect();
}

window.addEventListener('resize', function () {
    cvs.width = innerWidth;
    cvs.height = this.innerHeight;
    mouse.radius = 170;
    init();
});

window.addEventListener('mouseout', function () {
    mouse.x = undefined;
    mouse.y = undefined;
});

init();
animate();

// HEXAGON GRID
function hexagonGrid() {
    const HEXAGON_GRID = document.getElementById("hexagonGrid");
    const CONTAINER = HEXAGON_GRID.parentNode;

    let wall = {
        width: CONTAINER.offsetWidth,
        height: CONTAINER.offsetHeight
    };

    let rowsNumber = Math.ceil(wall.height / 80);
    let columnsNumber = Math.ceil(wall.width / 100) + 1;

    HEXAGON_GRID.innerHTML = "";

    for (let i = 0; i < rowsNumber; i++) {
        let row = document.createElement("div");
        row.className = "row";
        HEXAGON_GRID.appendChild(row);
    }

    let rows = HEXAGON_GRID.querySelectorAll(".row");

    for (let i = 0; i < rows.length; i++) {
        for (let j = 0; j < columnsNumber; j++) {
            let hexagon = document.createElement("div");
            hexagon.className = "hexagon";
            rows[i].appendChild(hexagon);
        }
    }
}

hexagonGrid();

window.addEventListener('resize', function () {
    hexagonGrid();
});

// FPS METER
(function () {
    let previousTime = Date.now();
    let frames = 0;
    let refreshRate = 1000;

    let fpsMeter = document.createElement("div");
    fpsMeter.id = "fpsMeter";
    document.body.appendChild(fpsMeter);

    requestAnimationFrame(function loop() {
        const TIME = Date.now();
        frames++;
        if (TIME > previousTime + refreshRate) {
            let fps = Math.round((frames * refreshRate) / (TIME - previousTime));
            previousTime = TIME;
            frames = 0;
            fpsMeter.innerHTML = "FPS: " + fps * (1000 / refreshRate);
        }
        requestAnimationFrame(loop);
    });

    fpsMeter.style.position = "fixed";
    fpsMeter.style.top = "25px";
    fpsMeter.style.right = "25px";
    fpsMeter.style.background = "rgba(0, 0, 0, 0.5)";
    fpsMeter.style.padding = "10px";
    fpsMeter.style.color = "rgba(255, 255, 255, 0.75)";
    fpsMeter.style.fontFamily = "Monospace";
    fpsMeter.style.fontSize = "24px";
    fpsMeter.style.zIndex = "10000";
})();