
// Your JavaScript code here
$("#nav-btn").on("click", function () {
    $('#takeover-nav').toggleClass("shown");
    $('.sticky-nav').toggleClass("difference");
});

// Cursor JavaScript (including TweenLite)
document.addEventListener("DOMContentLoaded", function (event) {
    var cursor = document.querySelector(".custom-cursor");
    var links = document.querySelectorAll("a, button, #nav-btn, input.btn");
    var initCursor = false;

    for (var i = 0; i < links.length; i++) {
        var selfLink = links[i];

        selfLink.addEventListener("mouseover", function () {
            cursor.classList.add("custom-cursor--link");
        });
        selfLink.addEventListener("mouseout", function () {
            cursor.classList.remove("custom-cursor--link");
        });
    }

    window.onmousemove = function (e) {
        var mouseX = e.clientX;
        var mouseY = e.clientY;

        if (!initCursor) {
            TweenLite.to(cursor, 0.5, {
                opacity: 1
            });
            initCursor = true;
        }

        TweenLite.to(cursor, 0, {
            top: mouseY + "px",
            left: mouseX + "px"
        });
    };

    window.ontouchmove = function (e) {
        var mouseX = e.touches[0].clientX;
        var mouseY = e.touches[0].clientY;
        if (!initCursor) {
            TweenLite.to(cursor, 0.3, {
                opacity: 1
            });
            initCursor = true;
        }

        TweenLite.to(cursor, 0, {
            top: mouseY + "px",
            left: mouseX + "px"
        });
    };

    window.onmouseout = function (e) {
        TweenLite.to(cursor, 0.3, {
            opacity: 0
        });
        initCursor = false;
    };

    window.ontouchstart = function (e) {
        TweenLite.to(cursor, 0.3, {
            opacity: 1
        });
    };

    window.ontouchend = function (e) {
        setTimeout(function () {
            TweenLite.to(cursor, 0.3, {
                opacity: 0
            });
        }, 200);
    };
});