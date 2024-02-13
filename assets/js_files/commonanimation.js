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


function triggerAnimation() {
    gsap.utils.toArray('.box').forEach((box, index) => {
        const delay = index * 0.2; // Delay for stagger effect
        gsap.fromTo(box, {
            opacity: 0, // Start with opacity 0
            x: index % 2 === 0 ? '-=100' : '+=100' // Move from left or right based on index
        }, {
            opacity: 1,
            x: 0,
            delay,
            duration: 0.8, // Duration of the animation
            ease: 'power2.out' // Easing function
        });
    });
}

// ScrollTrigger to trigger the animation when in the viewport
gsap.registerPlugin(ScrollTrigger);
ScrollTrigger.create({
    trigger: '.contain', // Trigger animation when the container is in the viewport
    start: "top center", // Start the animation when the container reaches the center of the viewport
    onEnter: triggerAnimation // Call the function to trigger animation
});


