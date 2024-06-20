 //Custom Cursor
    
 const coords = { x: 0, y: 0 };
 const circles = document.querySelectorAll(".circle");

 const colors = [
   "#3A0088",
   "#5C0099",
   "#7D0CB3",
   "#9F49C6",
   "#C486D9",
   "#DEC2EB",
   "#F2E6FF",
   "#c38aff",
   "#ffd0e3",
   "#ffe5e8",
   
   "#c5415d",
   "#c03b5d",
   "#b22c5e",
   "#ac265e",
   "#9c155f",
   "#950f5f",
   "#830060",
   "#7c0060",
   "#680060",
   "#60005f",
   "#48005f",
   "#3d005e"
 ];

 circles.forEach(function (circle, index) {
   circle.x = 0;
   circle.y = 0;
   circle.style.backgroundColor = colors[index % colors.length];
 });

 window.addEventListener("mousemove", function (e) {
   coords.x = e.clientX;
   coords.y = e.clientY;

 });

 function animateCircles() {

   let x = coords.x;
   let y = coords.y;

   circles.forEach(function (circle, index) {
     circle.style.left = x - 12 + "px";
     circle.style.top = y - 12 + "px";

     circle.style.scale = (circles.length - index) / circles.length;

     circle.x = x;
     circle.y = y;

     const nextCircle = circles[index + 1] || circles[0];
     x += (nextCircle.x - x) * 0.3;
     y += (nextCircle.y - y) * 0.3;
   });

   requestAnimationFrame(animateCircles);
 }

 animateCircles();


 // Function to toggle dark mode
 function toggleDarkMode() {
   const isDarkMode = isDarkModePreferred();
   setDarkModePreference(!isDarkMode);
   applyDarkModePreference();
 }

 // Function to apply dark mode preference
 function applyDarkModePreference() {
   const isDarkMode = isDarkModePreferred();
   if (isDarkMode) {
     document.body.classList.add('dark-mode');
     document.getElementById('theme-icon').src = 'assets/images/icons8-sun.svg';
   } else {
     document.body.classList.remove('dark-mode');
     document.getElementById('theme-icon').src = 'assets/images/moon_solid.svg';
   }
 }

 // Function to set dark mode preference
 document.addEventListener('DOMContentLoaded', () => {
   const currentTheme = localStorage.getItem('theme');
   const switchCheckbox = document.getElementById('switch'); // Define switchCheckbox here
   const starRating = document.querySelector('.star_rating');
   const thankYouMessage = document.querySelector(".thank_you_message");
   if (switchCheckbox) { // Check if switchCheckbox is not null
     function applyDarkModeStyles() {
       document.body.classList.remove('light-mode');
       document.body.classList.add('dark-mode');
       starRating.style.backgroundColor = '#2d2828';
       thankYouMessage.style.backgroundColor = '#2d2828';
     }

     function applyLightModeStyles() {
       document.body.classList.remove('dark-mode');
       document.body.classList.add('light-mode');
       starRating.style.backgroundColor = 'white';
       thankYouMessage.style.backgroundColor = 'white';
     }

     if (currentTheme) {
       if (currentTheme === 'dark-mode') {
         applyDarkModeStyles();
         switchCheckbox.checked = true;
       } else {
         applyLightModeStyles();
       }
     }

     switchCheckbox.addEventListener('change', () => {
       if (switchCheckbox.checked) {
         applyDarkModeStyles();
         localStorage.setItem('theme', 'dark-mode');
       } else {
         applyLightModeStyles();
         localStorage.setItem('theme', 'light-mode');
       }
     });
   } else {
     console.error("Switch checkbox not found!"); // Log an error if switchCheckbox is null
   }
 });