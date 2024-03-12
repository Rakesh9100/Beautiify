
function toggleDarkMode() {
    const body = document.body;
    body.classList.toggle("dark-mode");
    localStorage.setItem("darkMode", body.classList.contains("dark-mode"));
}

// Check for saved preference on page load
const savedPreference = localStorage.getItem("darkMode");
if (savedPreference === "true") {
    document.body.classList.add("dark-mode");
}

// Add event listener to toggle button
const toggleButton = document.getElementById("dark-mode-toggle");
toggleButton.addEventListener("click", toggleDarkMode);