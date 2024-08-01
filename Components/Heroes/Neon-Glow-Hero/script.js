document.addEventListener('DOMContentLoaded', function () {
    const content = document.querySelector('.content');

    // Fade in the content on page load
    setTimeout(function () {
        content.classList.add('show');
    }, 500); // Adjust delay as needed

    // Smooth scroll to content on button click
    const button = document.querySelector('.button');
    button.addEventListener('click', function (event) {
        event.preventDefault();
        const contentOffset = content.offsetTop;
        window.scrollTo({
            top: contentOffset,
            behavior: 'smooth'
        });
    });
});
