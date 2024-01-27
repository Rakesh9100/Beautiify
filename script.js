const hamburger = document.querySelector(".hamburger");
const navMenu = document.querySelector(".nav-menu");

document.addEventListener("DOMContentLoaded", function() {
    setTimeout(function() {
        document.querySelector("body").classList.add("loaded");
    }, 500)
});

function modeFn(){
    var element = document.body;
    element.classList.toggle("dark-mode")
}
hamburger.addEventListener("click", mobileMenu);
function mobileMenu() {
    hamburger.classList.toggle("active");
    navMenu.classList.toggle("active");
}

const navLink = document.querySelectorAll(".nav-link");
navLink.forEach(n => n.addEventListener("click", closeMenu));

function closeMenu() {
    hamburger.classList.remove("active");
    navMenu.classList.remove("active");
}

let calcScrollValue = () => {
    let scrollProg = document.getElementById("progress");
    let pos = document.documentElement.scrollTop;
    let calcHeight =
        document.documentElement.scrollHeight -
        document.documentElement.clientHeight;
    let scrollValue = Math.round((pos * 100) / calcHeight);
    if (pos > 100) {
        scrollProg.style.display = "grid";
    } else {
        scrollProg.style.display = "none";
    }
    scrollProg.addEventListener("click", () => {
        document.documentElement.scrollTop = 0;
    });
    scrollProg.style.background = `conic-gradient(#0063ba ${scrollValue}%, #d499de ${scrollValue}%)`;
};

window.addEventListener('scroll', function () {
    var scrollToTopButton = document.getElementById('progress');
    if (window.pageYOffset > 200) {
        scrollToTopButton.style.display = 'block';
    } else {
        scrollToTopButton.style.display = 'none';
    }
});


function toggleMode(){
    var element = document.body;
    element.classList.toggle("dark-mode")
}

window.onscroll = calcScrollValue;
window.onload = calcScrollValue;

document.getElementById("year").textContent = new Date().getFullYear();

// Function to filter components
function filterComponents() {
    var input, filter, components, i;
    input = document.getElementById('componentSearch');
    filter = input.value.toUpperCase();
    components = document.querySelectorAll('.container .box');
    console.log(filter)
    console.log(components)

    for (i = 0; i < components.length; i++) {
        var component = components[i];
        var h2 = component.querySelector('h2');
        var componentName = h2.textContent || h2.innerText;

        if (componentName.toUpperCase().indexOf(filter) > -1) {
            component.style.display="flex";
        } else {
            component.style.display="none";
        }
    }
}
