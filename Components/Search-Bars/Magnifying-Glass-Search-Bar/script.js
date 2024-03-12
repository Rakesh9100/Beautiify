$('.wrapper').click(function () {
    $('.search').addClass('opened');
    $('.searchbox').focus();
});

$(document).keyup(function (e) {
    if (e.keyCode == 27) {
        $('.search').removeClass('spin');
        $('.exit').removeClass('dark'); $('.search').removeClass('opened');
        $('.wrapper').removeClass('shrink');
        $('.searchbox').val('');
    }
});

$('.inner h4').click(function () {

    $('.search').removeClass('spin');
    $('.exit').removeClass('dark'); $('.search').removeClass('opened'); $('.wrapper').removeClass('shrink');
    $('.searchbox').val('');
});

$('.exit').click(function () {
    $('.search').removeClass('opened');
});

$('.searchform').submit(function () {
    $('.search').removeClass('spin');
    $('.exit').removeClass('dark'); $('.search').removeClass('opened'); $('.wrapper').removeClass('shrink');
    $('.searchbox').val('');
    return false;
});