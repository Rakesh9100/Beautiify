document.documentElement.className = "js";
var supportsCssVars = function () {
    var e, t = document.createElement("style"); return t.innerHTML = "root: { --tmp-var: bold; }",
        document.head.appendChild(t), e = !!(window.CSS && window.CSS.supports && window.CSS.supports("font-weight",
            "var(--tmp-var)")), t.parentNode.removeChild(t), e
};
supportsCssVars() || alert("Please view this demo in a modern browser that supports CSS Variables.");

'use strict';
!function () { "use strict"; var r = .5 * (Math.sqrt(3) - 1), e = (3 - Math.sqrt(3)) / 6, t = 1 / 6, a = (Math.sqrt(5) - 1) / 4, o = (5 - Math.sqrt(5)) / 20; function i(r) { var e; e = "function" == typeof r ? r : r ? function () { var r = 0, e = 0, t = 0, a = 1, o = (i = 4022871197, function (r) { r = r.toString(); for (var e = 0; e < r.length; e++) { var t = .02519603282416938 * (i += r.charCodeAt(e)); t -= i = t >>> 0, i = (t *= i) >>> 0, i += 4294967296 * (t -= i) } return 2.3283064365386963e-10 * (i >>> 0) }); var i; r = o(" "), e = o(" "), t = o(" "); for (var n = 0; n < arguments.length; n++)(r -= o(arguments[n])) < 0 && (r += 1), (e -= o(arguments[n])) < 0 && (e += 1), (t -= o(arguments[n])) < 0 && (t += 1); return o = null, function () { var o = 2091639 * r + 2.3283064365386963e-10 * a; return r = e, e = t, t = o - (a = 0 | o) } }(r) : Math.random, this.p = n(e), this.perm = new Uint8Array(512), this.permMod12 = new Uint8Array(512); for (var t = 0; t < 512; t++)this.perm[t] = this.p[255 & t], this.permMod12[t] = this.perm[t] % 12 } function n(r) { var e, t = new Uint8Array(256); for (e = 0; e < 256; e++)t[e] = e; for (e = 0; e < 255; e++) { var a = e + ~~(r() * (256 - e)), o = t[e]; t[e] = t[a], t[a] = o } return t } i.prototype = { grad3: new Float32Array([1, 1, 0, -1, 1, 0, 1, -1, 0, -1, -1, 0, 1, 0, 1, -1, 0, 1, 1, 0, -1, -1, 0, -1, 0, 1, 1, 0, -1, 1, 0, 1, -1, 0, -1, -1]), grad4: new Float32Array([0, 1, 1, 1, 0, 1, 1, -1, 0, 1, -1, 1, 0, 1, -1, -1, 0, -1, 1, 1, 0, -1, 1, -1, 0, -1, -1, 1, 0, -1, -1, -1, 1, 0, 1, 1, 1, 0, 1, -1, 1, 0, -1, 1, 1, 0, -1, -1, -1, 0, 1, 1, -1, 0, 1, -1, -1, 0, -1, 1, -1, 0, -1, -1, 1, 1, 0, 1, 1, 1, 0, -1, 1, -1, 0, 1, 1, -1, 0, -1, -1, 1, 0, 1, -1, 1, 0, -1, -1, -1, 0, 1, -1, -1, 0, -1, 1, 1, 1, 0, 1, 1, -1, 0, 1, -1, 1, 0, 1, -1, -1, 0, -1, 1, 1, 0, -1, 1, -1, 0, -1, -1, 1, 0, -1, -1, -1, 0]), noise2D: function (t, a) { var o, i, n = this.permMod12, f = this.perm, s = this.grad3, v = 0, h = 0, l = 0, u = (t + a) * r, d = Math.floor(t + u), p = Math.floor(a + u), M = (d + p) * e, m = t - (d - M), c = a - (p - M); m > c ? (o = 1, i = 0) : (o = 0, i = 1); var y = m - o + e, w = c - i + e, g = m - 1 + 2 * e, A = c - 1 + 2 * e, x = 255 & d, q = 255 & p, D = .5 - m * m - c * c; if (D >= 0) { var S = 3 * n[x + f[q]]; v = (D *= D) * D * (s[S] * m + s[S + 1] * c) } var U = .5 - y * y - w * w; if (U >= 0) { var b = 3 * n[x + o + f[q + i]]; h = (U *= U) * U * (s[b] * y + s[b + 1] * w) } var F = .5 - g * g - A * A; if (F >= 0) { var N = 3 * n[x + 1 + f[q + 1]]; l = (F *= F) * F * (s[N] * g + s[N + 1] * A) } return 70 * (v + h + l) }, noise3D: function (r, e, a) { var o, i, n, f, s, v, h, l, u, d, p = this.permMod12, M = this.perm, m = this.grad3, c = (r + e + a) * (1 / 3), y = Math.floor(r + c), w = Math.floor(e + c), g = Math.floor(a + c), A = (y + w + g) * t, x = r - (y - A), q = e - (w - A), D = a - (g - A); x >= q ? q >= D ? (s = 1, v = 0, h = 0, l = 1, u = 1, d = 0) : x >= D ? (s = 1, v = 0, h = 0, l = 1, u = 0, d = 1) : (s = 0, v = 0, h = 1, l = 1, u = 0, d = 1) : q < D ? (s = 0, v = 0, h = 1, l = 0, u = 1, d = 1) : x < D ? (s = 0, v = 1, h = 0, l = 0, u = 1, d = 1) : (s = 0, v = 1, h = 0, l = 1, u = 1, d = 0); var S = x - s + t, U = q - v + t, b = D - h + t, F = x - l + 2 * t, N = q - u + 2 * t, C = D - d + 2 * t, P = x - 1 + .5, T = q - 1 + .5, _ = D - 1 + .5, j = 255 & y, k = 255 & w, z = 255 & g, B = .6 - x * x - q * q - D * D; if (B < 0) o = 0; else { var E = 3 * p[j + M[k + M[z]]]; o = (B *= B) * B * (m[E] * x + m[E + 1] * q + m[E + 2] * D) } var G = .6 - S * S - U * U - b * b; if (G < 0) i = 0; else { var H = 3 * p[j + s + M[k + v + M[z + h]]]; i = (G *= G) * G * (m[H] * S + m[H + 1] * U + m[H + 2] * b) } var I = .6 - F * F - N * N - C * C; if (I < 0) n = 0; else { var J = 3 * p[j + l + M[k + u + M[z + d]]]; n = (I *= I) * I * (m[J] * F + m[J + 1] * N + m[J + 2] * C) } var K = .6 - P * P - T * T - _ * _; if (K < 0) f = 0; else { var L = 3 * p[j + 1 + M[k + 1 + M[z + 1]]]; f = (K *= K) * K * (m[L] * P + m[L + 1] * T + m[L + 2] * _) } return 32 * (o + i + n + f) }, noise4D: function (r, e, t, i) { var n, f, s, v, h, l, u, d, p, M, m, c, y, w, g, A, x, q = this.perm, D = this.grad4, S = (r + e + t + i) * a, U = Math.floor(r + S), b = Math.floor(e + S), F = Math.floor(t + S), N = Math.floor(i + S), C = (U + b + F + N) * o, P = r - (U - C), T = e - (b - C), _ = t - (F - C), j = i - (N - C), k = 0, z = 0, B = 0, E = 0; P > T ? k++ : z++, P > _ ? k++ : B++, P > j ? k++ : E++, T > _ ? z++ : B++, T > j ? z++ : E++, _ > j ? B++ : E++; var G = P - (l = k >= 3 ? 1 : 0) + o, H = T - (u = z >= 3 ? 1 : 0) + o, I = _ - (d = B >= 3 ? 1 : 0) + o, J = j - (p = E >= 3 ? 1 : 0) + o, K = P - (M = k >= 2 ? 1 : 0) + 2 * o, L = T - (m = z >= 2 ? 1 : 0) + 2 * o, O = _ - (c = B >= 2 ? 1 : 0) + 2 * o, Q = j - (y = E >= 2 ? 1 : 0) + 2 * o, R = P - (w = k >= 1 ? 1 : 0) + 3 * o, V = T - (g = z >= 1 ? 1 : 0) + 3 * o, W = _ - (A = B >= 1 ? 1 : 0) + 3 * o, X = j - (x = E >= 1 ? 1 : 0) + 3 * o, Y = P - 1 + 4 * o, Z = T - 1 + 4 * o, $ = _ - 1 + 4 * o, rr = j - 1 + 4 * o, er = 255 & U, tr = 255 & b, ar = 255 & F, or = 255 & N, ir = .6 - P * P - T * T - _ * _ - j * j; if (ir < 0) n = 0; else { var nr = q[er + q[tr + q[ar + q[or]]]] % 32 * 4; n = (ir *= ir) * ir * (D[nr] * P + D[nr + 1] * T + D[nr + 2] * _ + D[nr + 3] * j) } var fr = .6 - G * G - H * H - I * I - J * J; if (fr < 0) f = 0; else { var sr = q[er + l + q[tr + u + q[ar + d + q[or + p]]]] % 32 * 4; f = (fr *= fr) * fr * (D[sr] * G + D[sr + 1] * H + D[sr + 2] * I + D[sr + 3] * J) } var vr = .6 - K * K - L * L - O * O - Q * Q; if (vr < 0) s = 0; else { var hr = q[er + M + q[tr + m + q[ar + c + q[or + y]]]] % 32 * 4; s = (vr *= vr) * vr * (D[hr] * K + D[hr + 1] * L + D[hr + 2] * O + D[hr + 3] * Q) } var lr = .6 - R * R - V * V - W * W - X * X; if (lr < 0) v = 0; else { var ur = q[er + w + q[tr + g + q[ar + A + q[or + x]]]] % 32 * 4; v = (lr *= lr) * lr * (D[ur] * R + D[ur + 1] * V + D[ur + 2] * W + D[ur + 3] * X) } var dr = .6 - Y * Y - Z * Z - $ * $ - rr * rr; if (dr < 0) h = 0; else { var pr = q[er + 1 + q[tr + 1 + q[ar + 1 + q[or + 1]]]] % 32 * 4; h = (dr *= dr) * dr * (D[pr] * Y + D[pr + 1] * Z + D[pr + 2] * $ + D[pr + 3] * rr) } return 27 * (n + f + s + v + h) } }, i._buildPermutationTable = n, "undefined" != typeof define && define.amd && define(function () { return i }), "undefined" != typeof exports ? exports.SimplexNoise = i : "undefined" != typeof window && (window.SimplexNoise = i), "undefined" != typeof module && (module.exports = i) }();

const { PI, cos, sin, abs, sqrt, pow, round, random, atan2 } = Math;
const HALF_PI = 0.5 * PI;
const TAU = 2 * PI;
const TO_RAD = PI / 180;
const floor = n => n | 0;
const rand = n => n * random();
const randIn = (min, max) => rand(max - min) + min;
const randRange = n => n - rand(2 * n);
const fadeIn = (t, m) => t / m;
const fadeOut = (t, m) => (m - t) / m;
const fadeInOut = (t, m) => {
    let hm = 0.5 * m;
    return abs((t + hm) % m - hm) / (hm);
};
const dist = (x1, y1, x2, y2) => sqrt(pow(x2 - x1, 2) + pow(y2 - y1, 2));
const angle = (x1, y1, x2, y2) => atan2(y2 - y1, x2 - x1);
const lerp = (n1, n2, speed) => (1 - speed) * n1 + speed * n2;
const particleCount = 700;
const particlePropCount = 9;
const particlePropsLength = particleCount * particlePropCount;
const rangeY = 100;
const baseTTL = 50;
const rangeTTL = 150;
const baseSpeed = 0.1;
const rangeSpeed = 2;
const baseRadius = 1;
const rangeRadius = 4;
const baseHue = 220;
const rangeHue = 100;
const noiseSteps = 8;
const xOff = 0.00125;
const yOff = 0.00125;
const zOff = 0.0005;
const backgroundColor = 'hsla(260,40%,5%,1)';

let container;
let canvas;
let ctx;
let center;
let gradient;
let tick;
let simplex;
let particleProps;
let positions;
let velocities;
let lifeSpans;
let speeds;
let sizes;
let hues;

function setup() {
    createCanvas();
    resize();
    initParticles();
    draw();
}

function initParticles() {
    tick = 0;
    simplex = new SimplexNoise();
    particleProps = new Float32Array(particlePropsLength);

    let i;

    for (i = 0; i < particlePropsLength; i += particlePropCount) {
        initParticle(i);
    }
}

function initParticle(i) {
    let x, y, vx, vy, life, ttl, speed, radius, hue;

    x = rand(canvas.a.width);
    y = center[1] + randRange(rangeY);
    vx = 0;
    vy = 0;
    life = 0;
    ttl = baseTTL + rand(rangeTTL);
    speed = baseSpeed + rand(rangeSpeed);
    radius = baseRadius + rand(rangeRadius);
    hue = baseHue + rand(rangeHue);

    particleProps.set([x, y, vx, vy, life, ttl, speed, radius, hue], i);
}

function drawParticles() {
    let i;

    for (i = 0; i < particlePropsLength; i += particlePropCount) {
        updateParticle(i);
    }
}

function updateParticle(i) {
    let i2 = 1 + i, i3 = 2 + i, i4 = 3 + i, i5 = 4 + i, i6 = 5 + i, i7 = 6 + i, i8 = 7 + i, i9 = 8 + i;
    let n, x, y, vx, vy, life, ttl, speed, x2, y2, radius, hue;

    x = particleProps[i];
    y = particleProps[i2];
    n = simplex.noise3D(x * xOff, y * yOff, tick * zOff) * noiseSteps * TAU;
    vx = lerp(particleProps[i3], cos(n), 0.5);
    vy = lerp(particleProps[i4], sin(n), 0.5);
    life = particleProps[i5];
    ttl = particleProps[i6];
    speed = particleProps[i7];
    x2 = x + vx * speed;
    y2 = y + vy * speed;
    radius = particleProps[i8];
    hue = particleProps[i9];

    drawParticle(x, y, x2, y2, life, ttl, radius, hue);

    life++;

    particleProps[i] = x2;
    particleProps[i2] = y2;
    particleProps[i3] = vx;
    particleProps[i4] = vy;
    particleProps[i5] = life;

    (checkBounds(x, y) || life > ttl) && initParticle(i);
}

function drawParticle(x, y, x2, y2, life, ttl, radius, hue) {
    ctx.a.save();
    ctx.a.lineCap = 'round';
    ctx.a.lineWidth = radius;
    ctx.a.strokeStyle = `hsla(${hue},100%,60%,${fadeInOut(life, ttl)})`;
    ctx.a.beginPath();
    ctx.a.moveTo(x, y);
    ctx.a.lineTo(x2, y2);
    ctx.a.stroke()
    ctx.a.closePath();
    ctx.a.restore();
}

function checkBounds(x, y) {
    return (
        x > canvas.a.width ||
        x < 0 ||
        y > canvas.a.height ||
        y < 0
    );
}

function createCanvas() {
    container = document.querySelector('.content--canvas');
    canvas = {
        a: document.createElement('canvas'),
        b: document.createElement('canvas')
    };
    canvas.b.style = `
		position: fixed;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
	`;
    container.appendChild(canvas.b);
    ctx = {
        a: canvas.a.getContext('2d'),
        b: canvas.b.getContext('2d')
    };
    center = [];
}

function resize() {
    const { innerWidth, innerHeight } = window;

    canvas.a.width = innerWidth;
    canvas.a.height = innerHeight;

    ctx.a.drawImage(canvas.b, 0, 0);

    canvas.b.width = innerWidth;
    canvas.b.height = innerHeight;

    ctx.b.drawImage(canvas.a, 0, 0);

    center[0] = 0.5 * canvas.a.width;
    center[1] = 0.5 * canvas.a.height;
}

function renderGlow() {
    ctx.b.save();
    ctx.b.filter = 'blur(8px) brightness(200%)';
    ctx.b.globalCompositeOperation = 'lighter';
    ctx.b.drawImage(canvas.a, 0, 0);
    ctx.b.restore();

    ctx.b.save();
    ctx.b.filter = 'blur(4px) brightness(200%)';
    ctx.b.globalCompositeOperation = 'lighter';
    ctx.b.drawImage(canvas.a, 0, 0);
    ctx.b.restore();
}

function renderToScreen() {
    ctx.b.save();
    ctx.b.globalCompositeOperation = 'lighter';
    ctx.b.drawImage(canvas.a, 0, 0);
    ctx.b.restore();
}

function draw() {
    tick++;

    ctx.a.clearRect(0, 0, canvas.a.width, canvas.a.height);

    ctx.b.fillStyle = backgroundColor;
    ctx.b.fillRect(0, 0, canvas.a.width, canvas.a.height);

    drawParticles();
    renderGlow();
    renderToScreen();

    window.requestAnimationFrame(draw);
}

window.addEventListener('load', setup);
window.addEventListener('resize', resize);