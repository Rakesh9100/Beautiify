document.addEventListener("DOMContentLoaded", function () {
  const neuForm = document.getElementById("neuForm");
  const usernameInput = document.getElementById("usernameInput");
  const passwordInput = document.getElementById("passwordInput");
  const submitButton = document.getElementById("submitButton");

  submitButton.addEventListener("click", function () {
    alert("Form Submitted!");
  });
});
