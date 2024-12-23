document.getElementById("signupForm").addEventListener("submit", function(event) {
    event.preventDefault();  // This will stop the form from submitting
    console.log("Form submission prevented.");
});