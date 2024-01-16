'use strict'

gsap.config({ trialWarn: false });
gsap.set('svg', {
    visibility: 'visible'
})

let tl = gsap.timeline({
    repeat: -1, yoyo: true, defaults: {
        ease: 'sine.inOut',
        duration: 1.2
    }
});
tl.fromTo('#gradDot', {
    x: 90
}, {
    x: -90
})
    .fromTo('#fillDot', {
        x: -90
    }, {
        x: 90
    }, 0)
    .fromTo('#mainGrad', {
        attr: {
            cx: 230,
            fx: 230
        }
    }, {
        attr: {
            cx: 570,
            fx: 570
        }
    }, 0)
