currentPosition = 0;

function popBreadcrumb() {
    var $this = $('.breadcrumb-active');

    if ($this.hasClass('breadcrumb-animated')) {
        $this.removeClass('breadcrumb-animated');
    }
    setTimeout(function () {
        $this.addClass('breadcrumb-animated')
    });

    if ($this.prevAll().length) {
        currentPosition += $this.width() - 50;
        $this.prevAll().css('left', currentPosition + 'px')
    }

    $this.removeClass('breadcrumb-active');
    $this.prev().length && $this.prev().addClass('breadcrumb-active')
}

function pushBreadcrumb() {
    var $this = $('.breadcrumb-active').next();
    if (!$this.length)
        return;

    if ($this.hasClass('breadcrumb-animated')) {
        $this.removeClass('breadcrumb-animated');
    }
    setTimeout(function () {
        $this.addClass('breadcrumb-animated')
    });
    currentPosition -= $this.width() - 50;
    $this.prevAll() && $this.prevAll().css('left', currentPosition + 'px')
    $('.breadcrumb-active').removeClass('breadcrumb-active');
    $this.addClass('breadcrumb-active')

}

$('.next').click(function () {
    var x = ($('.slider-scroller').data('X') ? (+$('.slider-scroller').data('X')) : 0) - 16.6666;
    $('.slider-scroller').css('transform', 'translateX($%)'.replace('$', x));
    $('.slider-scroller').data('X', x);
    popBreadcrumb();
})

$('.prev').click(function () {
    var x = ($('.slider-scroller').data('X') ? (+$('.slider-scroller').data('X')) : 0) + 16.6666;
    $('.slider-scroller').css('transform', 'translateX($%)'.replace('$', x));
    $('.slider-scroller').data('X', x);
    pushBreadcrumb();
})