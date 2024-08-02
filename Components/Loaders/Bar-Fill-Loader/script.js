window.onload = function () {
    var loaderBar = document.getElementById('loader-bar');

    var width = 0;
    var direction = 'right';

    var interval = setInterval(function () {
        if (direction === 'right') {
            width++;
            loaderBar.style.width = width + '%';

            if (width >= 150) {
                direction = 'left';
            }
        } else if (direction === 'left') {
            width--;
            loaderBar.style.width = width + '%';

            if (width <= 0) {
                direction = 'right';
            }
        }
    }, 20);
};
