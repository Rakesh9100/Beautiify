const hamburger = document.querySelector(".hamburger");
const navMenu = document.querySelector(".nav-menu");

document.addEventListener("DOMContentLoaded", function() {
    setTimeout(function() {
        document.querySelector("body").classList.add("loaded");
    }, 500)
});

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

if (body.style.backgroundImage === "" || body.style.backgroundImage === "none") {
    scrollToTopButton.style.background = "blue"; 
  } else {
    scrollToTopButton.style.background = "";
  };

window.onscroll = calcScrollValue;
window.onload = calcScrollValue;

document.getElementById("year").textContent = new Date().getFullYear();

function myFunction(x) {
    x.classList.toggle("fa-moon");
    var element = document.body;
    element.classList.toggle("nav-dark");
    element.classList.toggle("dark-container");
  }
  function changeColor() {
      var body = document.body;
      var FootText = document.querySelectorAll(".contributors h1");
      var start = document.querySelector(".started");
      var navbar = document.querySelector(".navbar");
      var containers = document.querySelectorAll(".box");
      var contentIcons = document.querySelectorAll(".container .box .content i");
      var boxText = document.querySelectorAll(".container .box .content h2");
      var progressBar = document.querySelector("#progress-value");
      var progress = document.querySelector("#progress");
  
      if (
        body.style.backgroundImage === "" ||
        body.style.backgroundImage === "none"
      ) {
        // Set the background color and gradient
        body.style.backgroundImage =
          "linear-gradient(to left bottom, #000000, #191818, #2a292a, #3d3c3c, #514f4f)";
        navbar.style.backgroundImage =
          "linear-gradient(to left bottom, #000000, #191818, #2a292a, #3d3c3c, #514f4f)";
  
        containers.forEach((container) => {
          container.style.background =
            "linear-gradient(to right top, #000000, #1a1919, #2d2b29, #403e3b, #52534e)";
          container.style.border = "4px solid #fff";
          container.style.boxShadow = "0 0 10px #fff";
        });
  
        contentIcons.forEach((icon) => {
          icon.style.color = "white";
        });
  
        boxText.forEach((h2) => {
          h2.style.color = "white";
        });
  
        FootText.forEach((h1) => {
          h1.style.color = "white";
        });
  
        start.style.backgroundColor = "white";
  
        progressBar.style.color = "black";
        progress.style.background =
          "linear-gradient(to right, #000000, #1a1919, #2d2b29, #403e3b, #52534e)";
      } else {
        // Reset all styles to default
        body.style.backgroundImage = "";
        navbar.style.backgroundImage = "";
  
        containers.forEach((container) => {
          container.style.background = "";
          container.style.border = "";
          container.style.boxShadow = "";
        });
  
        contentIcons.forEach((icon) => {
          icon.style.color = "";
        });
  
        boxText.forEach((h2) => {
          h2.style.color = "";
        });
  
        FootText.forEach((h1) => {
          h1.style.color = "";
        });
  
        start.style.backgroundColor = "";
        progressBar.style.color = "";
        progress.style.background = "";
      }
    }