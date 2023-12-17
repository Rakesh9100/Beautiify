// Slider
const carousel = function () {
    const carouselImgs = document.querySelectorAll('.img-item');
    const btnLeft = document.querySelector('.change__btn--left');
    const btnRight = document.querySelector('.change__btn--right');
    let CurImg = 0;
    const MaxImg = carouselImgs.length;
    const dotContainer = document.querySelector('.dots');

    // Functions
    const createDots = function () {
        carouselImgs.forEach(function (_, i) {
            dotContainer.insertAdjacentHTML('beforeend', `<button class="dots__dot" data-img="${i}"></button> </button>`);
        });
    };
    const activateDot = function (Img) {
        document.querySelectorAll('.dots__dot').forEach(dot => dot.classList.remove('dots__dot--active'));

        document.querySelector(`.dots__dot[data-img="${Img}"]`).classList.add('dots__dot--active');
    };
    const goToImg = function (Img) {
        carouselImgs.forEach((s, i) => (s.style.transform = `translateX(${100 * (i - Img)}%)`));
        activateDot(Img);
    };

    // Next Img
    const nextImg = function () {
        if (CurImg === MaxImg - 1) {
            CurImg = 0;
        } else {
            CurImg++;
        }
        goToImg(CurImg);
    };
    const prevImg = function () {
        if (CurImg === 0) {
            CurImg = MaxImg - 1;
        } else {
            CurImg--;
        }
        goToImg(CurImg);
    };

    const init = function () {
        createDots();
        goToImg(0);
    };
    init();

    // Event handlers
    btnRight.addEventListener('click', nextImg);
    btnLeft.addEventListener('click', prevImg);

    document.addEventListener('keydown', function (e) {
        if (e.key === 'ArrowLeft') prevImg();
        else if (e.key === 'ArrowRight') nextImg();
    });

    dotContainer.addEventListener('click', function (e) {
        if (e.target.classList.contains('dots__dot')) {
            const Img = e.target.dataset.img;
            goToImg(Img);
        }
    });
};
carousel();
