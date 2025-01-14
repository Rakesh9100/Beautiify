document.addEventListener("DOMContentLoaded", function (event) {
    let circles = document.querySelectorAll(".circle");
    circles.forEach(function (progress) {
      let degree = 0;
      let targetDegree = parseInt(progress.getAttribute("data-degree"));
      let color = progress.getAttribute("data-color");
      let number = progress.querySelector(".number");
  
      let interval = setInterval(function () {
        degree += 1;
        if (degree > targetDegree) {
          clearInterval(interval);
          return;
        }
        progress.style.background = `conic-gradient(${color} ${degree}%, #222222 0%)`;
        number.innerHTML = `${degree}<span>%</span>`;
        number.style.color = color;
      }, 50);
    });
  });