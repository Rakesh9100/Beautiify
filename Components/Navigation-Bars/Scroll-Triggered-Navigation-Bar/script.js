// Add this JavaScript to your script.js file

document.addEventListener('scroll', function () {
    var header = document.querySelector('.sticky-header');

    // Show the header after scrolling down 100 pixels
    header.style.top = (window.scrollY < 100) ? '0' : '-80px';
});
