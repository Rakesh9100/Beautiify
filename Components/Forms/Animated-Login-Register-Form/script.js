const registerButton = document.getElementById("register");
const loginButton = document.getElementById("login");
const container = document.getElementById("container");

registerButton.addEventListener("click", () => {
    container.classList.add("right-panel-active");
});

loginButton.addEventListener("click", () => {
    container.classList.remove("right-panel-active");
});

function refreshPage() {
    location.reload();
}

const smallScreenRegisterButton = document.getElementById("go-to-register-btn");
const smallScreenRegisterContainer = document.getElementById("small-screen-register-container");
const smallScreenLoginContainer = document.getElementById("small-screen-login-container");
const smallScreenLoginButton = document.getElementById("go-to-login-btn");

smallScreenRegisterButton.addEventListener("click", showRegister)

smallScreenLoginButton.addEventListener("click", showLogin);

// Function to show the login form
function showLogin() {
    document.getElementById('register-form').style.display = 'none'; // Hide register form
    document.getElementById('login-form').style.display = 'block'; // Show login form
}

// Function to show the register form
function showRegister() {
    document.getElementById('login-form').style.display = 'none'; // Hide login form
    document.getElementById('register-form').style.display = 'block'; // Show register form
}