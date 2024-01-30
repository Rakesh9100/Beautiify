var tl = gsap.timeline();

tl.from(".navbar", {
    opacity: 0,
    y: -30,
    delay: 1,
    duration: 0.5
});

tl.from(".heading", {
    opacity: 0,
    scale: 1.04,
    y: 10
});

tl.from(".contain", {
    opacity: 0,
    y: 10
});
