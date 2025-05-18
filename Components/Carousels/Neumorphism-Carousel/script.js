var swiper = new Swiper(".mySwiper", {
    spaceBetween: 30,
    centeredSlides: true,
    loop: true,
    autoplay: {
        delay: 4000,
        disableOnInteraction: false,
        pauseOnMouseEnter: true,
    },
    pagination: {
        el: ".swiper-pagination",
        clickable: true,
    },
    observer: true,
    observeParents: true,
    resizeObserver: true,
});

// Debounce resize updates to prevent shaking
let resizeTimeout;
window.addEventListener('resize', () => {
    swiper.autoplay.stop();

    clearTimeout(resizeTimeout);
    resizeTimeout = setTimeout(() => {
        swiper.update();
        swiper.autoplay.start();
    }, 150);
});