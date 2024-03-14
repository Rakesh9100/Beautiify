$(document).ready(function () {
    $('.sign-up-form').on('submit', submit);
    $('.reset-button').on('click', reset);
});

function submit(e) {
    $('.sign-up-container').addClass('submitted');
    e.preventDefault();
}

function reset() {
    $('.sign-up-container').removeClass('submitted');
    $('.sign-up-form')[0].reset();
}