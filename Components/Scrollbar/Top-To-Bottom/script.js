let mybutton = document.getElementById("Btn");


window.onscroll = function() {scrollFunction()};

function scrollFunction() {
  if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20|| window.scrollY>20) {
    console.log(document.body.scrollTop);
    console.log(document.documentElement.scrollTop);
    console.log(window.scrollY);
    mybutton.style.display = "block";
  } else {
    mybutton.style.display = "none";
  }
}

// When the user clicks on the button, scroll to the top of the document
function topFunction() {
  document.body.scrollTop = 0;
  document.documentElement.scrollTop = 0;
}