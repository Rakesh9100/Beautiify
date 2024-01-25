
RGBA(`
    vec2 uv = gl_FragCoord.xy/resolution - 0.5;
    uv.x *= resolution.x/resolution.y;
    if (uv.x > 0.0) uv.y = -uv.y;

    float r = 0.2*cos(2.0*atan(uv.y, uv.x));
    float d = dot(uv, uv);
    float s = 0.0015/sqrt(d);
    float c = 1.0 - smoothstep(r, r+s, d)
                  - smoothstep(r, r-s, d);
    
    gl_FragColor = vec4(c, c, c, 1.0);

    vec3 p = vec3(0.5, 0.2, 0.33);
    r = sqrt(r);
    d = pow(d, 0.2) * 25.0;

    for (float i = 1e-6; i < 1.0; i += 0.05) {
        float t = 1.0 + time*1.5 + i;
        vec2 uv2 = uv + vec2(cos(t), sin(t)) * r;
        vec3 color = vec3(sin(t*4.0), cos(t*3.0), sin(t*7.0));
        c = smoothstep(i/d, 0.0, length(uv2));
        gl_FragColor += vec4(p * (1.0 + color) * c, 1.);   
    }
`);
