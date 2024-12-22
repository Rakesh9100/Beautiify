const canvas = document.getElementById('infinity-loader');
const gl = canvas.getContext('webgl');

if (!gl) {
    console.error('WebGL not supported');
}

const vertexShaderSource = `
    attribute vec4 a_position;
    void main() {
        gl_Position = a_position;
    }
`;

const fragmentShaderSource = `
    precision mediump float;
    uniform vec2 resolution;
    uniform float time;
    void main() {
        vec2 uv = gl_FragCoord.xy / resolution - 0.5;
        uv.x *= resolution.x / resolution.y;
        if (uv.x > 0.0) uv.y = -uv.y;

        float r = 0.2 * cos(2.0 * atan(uv.y, uv.x));
        float d = dot(uv, uv);
        float s = 0.0015 / sqrt(d);
        float c = 1.0 - smoothstep(r, r + s, d)
                      - smoothstep(r, r - s, d);

        gl_FragColor = vec4(c, c, c, 1.0);

        vec3 p = vec3(0.5, 0.2, 0.33);
        r = sqrt(r);
        d = pow(d, 0.2) * 25.0;

        for (float i = 1e-6; i < 1.0; i += 0.05) {
            float t = 1.0 + time * 1.5 + i;
            vec2 uv2 = uv + vec2(cos(t), sin(t)) * r;
            vec3 color = vec3(sin(t * 4.0), cos(t * 3.0), sin(t * 7.0));
            c = smoothstep(i / d, 0.0, length(uv2));
            gl_FragColor += vec4(p * (1.0 + color) * c, 1.0);
        }
    }
`;

function createShader(gl, type, source) {
    const shader = gl.createShader(type);
    gl.shaderSource(shader, source);
    gl.compileShader(shader);
    if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
        console.error(gl.getShaderInfoLog(shader));
        gl.deleteShader(shader);
        return null;
    }
    return shader;
}

function createProgram(gl, vertexShader, fragmentShader) {
    const program = gl.createProgram();
    gl.attachShader(program, vertexShader);
    gl.attachShader(program, fragmentShader);
    gl.linkProgram(program);
    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
        console.error(gl.getProgramInfoLog(program));
        gl.deleteProgram(program);
        return null;
    }
    return program;
}

const vertexShader = createShader(gl, gl.VERTEX_SHADER, vertexShaderSource);
const fragmentShader = createShader(gl, gl.FRAGMENT_SHADER, fragmentShaderSource);
const program = createProgram(gl, vertexShader, fragmentShader);

const positionAttributeLocation = gl.getAttribLocation(program, 'a_position');
const resolutionUniformLocation = gl.getUniformLocation(program, 'resolution');
const timeUniformLocation = gl.getUniformLocation(program, 'time');

const positionBuffer = gl.createBuffer();
gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
const positions = [
    -1, -1,
    1, -1,
    -1, 1,
    -1, 1,
    1, -1,
    1, 1,
];
gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(positions), gl.STATIC_DRAW);

function resizeCanvasToDisplaySize(canvas) {
    const displayWidth = canvas.clientWidth;
    const displayHeight = canvas.clientHeight;

    if (canvas.width !== displayWidth || canvas.height !== displayHeight) {
        canvas.width = displayWidth;
        canvas.height = displayHeight;
    }
}

function render(time) {
    resizeCanvasToDisplaySize(canvas);

    gl.viewport(0, 0, gl.canvas.width, gl.canvas.height);

    gl.clear(gl.COLOR_BUFFER_BIT);

    gl.useProgram(program);

    gl.enableVertexAttribArray(positionAttributeLocation);
    gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
    gl.vertexAttribPointer(positionAttributeLocation, 2, gl.FLOAT, false, 0, 0);

    gl.uniform2f(resolutionUniformLocation, gl.canvas.width, gl.canvas.height);
    gl.uniform1f(timeUniformLocation, time * 0.001);

    gl.drawArrays(gl.TRIANGLES, 0, 6);

    requestAnimationFrame(render);
}

requestAnimationFrame(render);