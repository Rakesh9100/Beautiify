const hamburger = document.querySelector(".hamburger");
const navMenu = document.querySelector(".nav-menu");

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

document.getElementById("year").textContent = new Date().getFullYear();

 //logo transform here

 function hoverLogo() {
    document.getElementById("logo").style.transform = "rotate(5deg) scale(1.1)";
    document.getElementById("logo").style.transition = "transform 0.3s ease-in-out, width 0.3s ease-in, height 0.3s ease-out";
}

function unhoverLogo() {
    document.getElementById("logo").style.transform = "rotate(0) scale(1)";
}
