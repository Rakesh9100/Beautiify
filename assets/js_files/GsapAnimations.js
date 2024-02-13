//gsap animations


//animation to header part(navbar , logo )
gsap.from(".navbar", { duration: 1, y: -100, opacity: 0, ease: "power4.out", delay: 1 });
gsap.from(".logo", { duration: 1, scale: 0, ease: "elastic.out(1, 0.3)", delay: 1 });
gsap.from(".nav-item", { duration: 0.8, opacity: 0, y: -20, stagger: 0.2, ease: "power2.out", delay: 1.5 });


// animation for cards
gsap.from(".zoom-effect",{
    scale:0.7,
    opacity:0,
    duration:1,
    stagger:0.2,
    scrollTrigger:{
        trigger: ".zoom-effect",
        scroller:"body",
        start:"top 70%",
        end:"top 65%",
        scrub:2 ,
        // markers : true,
    },
});
