const searchContainer = document.querySelector(".search-container");
const microphone = document.querySelector(".mic");
const microphoneMsg = document.querySelector(".voice");

microphone.addEventListener("mouseover", () => {
    gsap.to(microphoneMsg, {
        opacity: 1,
        duration: 1,
        ease: "back"
    });

});
microphone.addEventListener("mouseout", () => {
    gsap.to(MicrophoneMsg, {
        opacity: 0,
        duration: 1,
        ease: "power2"
    });
});

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
};


window.addEventListener('mousemove', function (event) {
    mouse.x = event.x;
    mouse.y = event.y;
    mouse.radius = 170;
    console.log(mouse.radius);
});

document.onmousemove = function (event) {
    var onmousestop = function () {
        mouse.radius = 0;
    }, thread;

    return function () {
        clearTimeout(thread);
        thread = setTimeout(onmousestop, 10);
    };
}();


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
    let numberOfParticles = cvs.height * cvs.width / 9000;
    for (let i = 0; i < numberOfParticles * 0.25; i++) {
        let size = Math.random() * 35 + 1;
        let x = Math.random() * (innerWidth - size * 2 - size * 2) + size * 2;
        let y = Math.random() * (innerWidth - size * 2 - size * 2) + size * 2;
        let directionX = Math.random() * 5 - 2.5;
        let directionY = Math.random() * 5 - 2.5;
        let color = '#72C100';
        particlesArray.push(new Particle(x, y, directionX, directionY, size, color));
    }
}

function connect() {
    let opacityValue = 1;
    for (let i = 0; i < particlesArray.length; i++) {
        for (let j = i; j < particlesArray.length; j++) {
            let distance = (particlesArray[i].x - particlesArray[j].x) * (particlesArray[i].x - particlesArray[j].x) + (particlesArray[i].y - particlesArray[j].y) * (particlesArray[i].y - particlesArray[j].y);

            if (distance < cvs.width / 7 * (cvs.height / 7)) {
                opacityValue = 1 - distance / 20000;
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
            let fps = Math.round(frames * refreshRate / (TIME - previousTime));
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
/*!
 * Particleground
 *
 * @author Jonathan Nicol - @mrjnicol
 * @version 1.1.0
 * @description Creates a canvas based particle system background
 *
 * Inspired by http://requestlab.fr/ and http://disruptivebydesign.com/
 */
!function (a, b) { "use strict"; function c(a) { a = a || {}; for (var b = 1; b < arguments.length; b++) { var c = arguments[b]; if (c) for (var d in c) c.hasOwnProperty(d) && ("object" == typeof c[d] ? deepExtend(a[d], c[d]) : a[d] = c[d]); } return a; } function d(d, g) { function h() { if (y) { r = b.createElement("canvas"), r.className = "pg-canvas", r.style.display = "block", d.insertBefore(r, d.firstChild), s = r.getContext("2d"), i(); for (var c = Math.round(r.width * r.height / g.density), e = 0; c > e; e++) { var f = new n(); f.setStackPos(e), z.push(f); } a.addEventListener("resize", function () { k(); }, !1), b.addEventListener("mousemove", function (a) { A = a.pageX, B = a.pageY; }, !1), D && !C && a.addEventListener("deviceorientation", function () { F = Math.min(Math.max(-event.beta, -30), 30), E = Math.min(Math.max(-event.gamma, -30), 30); }, !0), j(), q("onInit"); } } function i() { r.width = d.offsetWidth, r.height = d.offsetHeight, s.fillStyle = g.dotColor, s.strokeStyle = g.lineColor, s.lineWidth = g.lineWidth; } function j() { if (y) { u = a.innerWidth, v = a.innerHeight, s.clearRect(0, 0, r.width, r.height); for (var b = 0; b < z.length; b++) z[b].updatePosition(); for (var b = 0; b < z.length; b++) z[b].draw(); G || (t = requestAnimationFrame(j)); } } function k() { i(); for (var a = d.offsetWidth, b = d.offsetHeight, c = z.length - 1; c >= 0; c--) (z[c].position.x > a || z[c].position.y > b) && z.splice(c, 1); var e = Math.round(r.width * r.height / g.density); if (e > z.length) for (; e > z.length;) { var f = new n(); z.push(f); } else e < z.length && z.splice(e); for (c = z.length - 1; c >= 0; c--) z[c].setStackPos(c); } function l() { G = !0; } function m() { G = !1, j(); } function n() { switch (this.stackPos, this.active = !0, this.layer = Math.ceil(3 * Math.random()), this.parallaxOffsetX = 0, this.parallaxOffsetY = 0, this.position = { x: Math.ceil(Math.random() * r.width), y: Math.ceil(Math.random() * r.height) }, this.speed = {}, g.directionX) { case "left": this.speed.x = +(-g.maxSpeedX + Math.random() * g.maxSpeedX - g.minSpeedX).toFixed(2); break; case "right": this.speed.x = +(Math.random() * g.maxSpeedX + g.minSpeedX).toFixed(2); break; default: this.speed.x = +(-g.maxSpeedX / 2 + Math.random() * g.maxSpeedX).toFixed(2), this.speed.x += this.speed.x > 0 ? g.minSpeedX : -g.minSpeedX; }switch (g.directionY) { case "up": this.speed.y = +(-g.maxSpeedY + Math.random() * g.maxSpeedY - g.minSpeedY).toFixed(2); break; case "down": this.speed.y = +(Math.random() * g.maxSpeedY + g.minSpeedY).toFixed(2); break; default: this.speed.y = +(-g.maxSpeedY / 2 + Math.random() * g.maxSpeedY).toFixed(2), this.speed.x += this.speed.y > 0 ? g.minSpeedY : -g.minSpeedY; } } function o(a, b) { return b ? void (g[a] = b) : g[a]; } function p() { console.log("destroy"), r.parentNode.removeChild(r), q("onDestroy"), f && f(d).removeData("plugin_" + e); } function q(a) { void 0 !== g[a] && g[a].call(d); } var r, s, t, u, v, w, x, y = !!b.createElement("canvas").getContext, z = [], A = 0, B = 0, C = !navigator.userAgent.match(/(iPhone|iPod|iPad|Android|BlackBerry|BB10|mobi|tablet|opera mini|nexus 7)/i), D = !!a.DeviceOrientationEvent, E = 0, F = 0, G = !1; return g = c({}, a[e].defaults, g), n.prototype.draw = function () { s.beginPath(), s.arc(this.position.x + this.parallaxOffsetX, this.position.y + this.parallaxOffsetY, g.particleRadius / 2, 0, 2 * Math.PI, !0), s.closePath(), s.fill(), s.beginPath(); for (var a = z.length - 1; a > this.stackPos; a--) { var b = z[a], c = this.position.x - b.position.x, d = this.position.y - b.position.y, e = Math.sqrt(c * c + d * d).toFixed(2); e < g.proximity && (s.moveTo(this.position.x + this.parallaxOffsetX, this.position.y + this.parallaxOffsetY), g.curvedLines ? s.quadraticCurveTo(Math.max(b.position.x, b.position.x), Math.min(b.position.y, b.position.y), b.position.x + b.parallaxOffsetX, b.position.y + b.parallaxOffsetY) : s.lineTo(b.position.x + b.parallaxOffsetX, b.position.y + b.parallaxOffsetY)); } s.stroke(), s.closePath(); }, n.prototype.updatePosition = function () { if (g.parallax) { if (D && !C) { var a = (u - 0) / 60; w = (E - -30) * a + 0; var b = (v - 0) / 60; x = (F - -30) * b + 0; } else w = A, x = B; this.parallaxTargX = (w - u / 2) / (g.parallaxMultiplier * this.layer), this.parallaxOffsetX += (this.parallaxTargX - this.parallaxOffsetX) / 10, this.parallaxTargY = (x - v / 2) / (g.parallaxMultiplier * this.layer), this.parallaxOffsetY += (this.parallaxTargY - this.parallaxOffsetY) / 10; } var c = d.offsetWidth, e = d.offsetHeight; switch (g.directionX) { case "left": this.position.x + this.speed.x + this.parallaxOffsetX < 0 && (this.position.x = c - this.parallaxOffsetX); break; case "right": this.position.x + this.speed.x + this.parallaxOffsetX > c && (this.position.x = 0 - this.parallaxOffsetX); break; default: (this.position.x + this.speed.x + this.parallaxOffsetX > c || this.position.x + this.speed.x + this.parallaxOffsetX < 0) && (this.speed.x = -this.speed.x); }switch (g.directionY) { case "up": this.position.y + this.speed.y + this.parallaxOffsetY < 0 && (this.position.y = e - this.parallaxOffsetY); break; case "down": this.position.y + this.speed.y + this.parallaxOffsetY > e && (this.position.y = 0 - this.parallaxOffsetY); break; default: (this.position.y + this.speed.y + this.parallaxOffsetY > e || this.position.y + this.speed.y + this.parallaxOffsetY < 0) && (this.speed.y = -this.speed.y); }this.position.x += this.speed.x, this.position.y += this.speed.y; }, n.prototype.setStackPos = function (a) { this.stackPos = a; }, h(), { option: o, destroy: p, start: m, pause: l }; } var e = "particleground", f = a.jQuery; a[e] = function (a, b) { return new d(a, b); }, a[e].defaults = { minSpeedX: .1, maxSpeedX: .7, minSpeedY: .1, maxSpeedY: .7, directionX: "center", directionY: "center", density: 1e4, dotColor: "#666666", lineColor: "#666666", particleRadius: 7, lineWidth: 1, curvedLines: !1, proximity: 100, parallax: !0, parallaxMultiplier: 5, onInit: function () { }, onDestroy: function () { } }, f && (f.fn[e] = function (a) { if ("string" == typeof arguments[0]) { var b, c = arguments[0], g = Array.prototype.slice.call(arguments, 1); return this.each(function () { f.data(this, "plugin_" + e) && "function" == typeof f.data(this, "plugin_" + e)[c] && (b = f.data(this, "plugin_" + e)[c].apply(this, g)); }), void 0 !== b ? b : this; } return "object" != typeof a && a ? void 0 : this.each(function () { f.data(this, "plugin_" + e) || f.data(this, "plugin_" + e, new d(this, a)); }); }); }(window, document), /**
* requestAnimationFrame polyfill by Erik Möller. fixes from Paul Irish and Tino Zijdel
* @see: http://paulirish.com/2011/requestanimationframe-for-smart-animating/
* @see: http://my.opera.com/emoller/blog/2011/12/20/requestanimationframe-for-smart-er-animating
* @license: MIT license
*/
    function () { for (var a = 0, b = ["ms", "moz", "webkit", "o"], c = 0; c < b.length && !window.requestAnimationFrame; ++c) window.requestAnimationFrame = window[b[c] + "RequestAnimationFrame"], window.cancelAnimationFrame = window[b[c] + "CancelAnimationFrame"] || window[b[c] + "CancelRequestAnimationFrame"]; window.requestAnimationFrame || (window.requestAnimationFrame = function (b) { var c = new Date().getTime(), d = Math.max(0, 16 - (c - a)), e = window.setTimeout(function () { b(c + d); }, d); return a = c + d, e; }), window.cancelAnimationFrame || (window.cancelAnimationFrame = function (a) { clearTimeout(a); }); }();


particleground(document.getElementById('particles-background'), {
    dotColor: 'rgba(255, 255, 255, 0.5)',
    lineColor: 'rgba(255, 255, 255, 0.05)',
    minSpeedX: 0.075,
    maxSpeedX: 0.15,
    minSpeedY: 0.075,
    maxSpeedY: 0.15,
    density: 7000, // One particle every n pixels
    curvedLines: false,
    proximity: 40, // How close two dots need to be before they join
    parallaxMultiplier: 20, // Lower the number is more extreme parallax
    particleRadius: 2 // Dot size
});