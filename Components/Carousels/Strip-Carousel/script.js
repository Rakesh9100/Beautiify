var carousel = {
    slides: [
        { bg: "img-1.jpg" },
        { bg: "img-2.jpg" },
        { bg: "img-3.jpg" },
        { bg: "img-4.jpg" }
    ],
    currentSlideIndex: 0,
    StripContent: undefined,
    c0: undefined,
    c1: undefined,
    canMove: true,
    begin: function () {
        this.StripContent = document.getElementsByClassName("StripContent");
        this.c0 = document.getElementsByClassName("content0");
        this.c1 = document.getElementsByClassName("content1");

        this.setContent(this.currentSlideIndex + 1, "left");

        setInterval(
            function () {
                carousel.animateSlider();
            },
            5000
        );
    },
    animateSlider: function () {
        if (this.canMove) {
            this.slide("left");
        }
    },
    slide: function (dir) {
        var nextSlide;
        var currentMarginLeft;
        var nextMarginLeft;

        this.setTransitionSpeed(0);

        if (dir == "left") {
            if (this.currentSlideIndex == this.slides.length - 1) {
                nextSlide = 0;
            } else {
                nextSlide = this.currentSlideIndex + 1;
            }

            currentMarginLeft = 0;
            nextMarginLeft = -100;
        }

        if (dir == "right") {
            if (this.currentSlideIndex == 0) {
                nextSlide = this.slides.length - 1;
            } else {
                nextSlide = this.currentSlideIndex - 1;
            }

            currentMarginLeft = -100;
            nextMarginLeft = 0;
        }

        this.setMargin(currentMarginLeft);
        this.setContent(nextSlide, dir);

        setTimeout(
            function () {
                carousel.setTransitionSpeed(1);
            },
            250
        );

        setTimeout(
            function () {
                carousel.setMargin(nextMarginLeft);
                carousel.currentSlideIndex = nextSlide;
            },
            500
        );

        setTimeout(
            function () {
                carousel.canMove = true;
            },
            5000
        );
    },
    setTransitionSpeed: function (interval) {
        for (var i = 0; i < this.StripContent.length; i++) {
            this.StripContent[i].style.webKitTransition = interval + "s all";
            this.StripContent[i].style.transition = interval + "s all";
        }
    },
    setMargin: function (margin) {
        for (var i = 0; i < this.StripContent.length; i++) {
            this.StripContent[i].style.marginLeft = margin + "%";
        }
    },
    setContent: function (next, dir) {
        for (var i = 0; i < this.c0.length; i++) {
            if (dir == "left") {
                this.c0[i].style.backgroundImage = "url(images/" + this.slides[this.currentSlideIndex].bg + ")";
                this.c1[i].style.backgroundImage = "url(images/" + this.slides[next].bg + ")";
            }

            if (dir == "right") {
                this.c0[i].style.backgroundImage = "url(images/" + this.slides[next].bg + ")";
                this.c1[i].style.backgroundImage = "url(images/" + this.slides[this.currentSlideIndex].bg + ")";
            }
        }
    },
    sliderButtonClick: function (dir) {
        this.canMove = false;
        this.slide(dir);
    }
};

// Initialize the carousel
carousel.begin();
