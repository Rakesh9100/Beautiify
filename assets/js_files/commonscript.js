// Dark mode
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

const toggleButton = document.getElementById("dark-mode-toggle");
toggleButton.addEventListener("click", toggleDarkMode);

// Hamburger menu
document.addEventListener("DOMContentLoaded", function () {
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
});

// Progress bar
window.addEventListener('scroll', function () {
    const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
    const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const scrolled = (winScroll / height) * 100;
    document.getElementById('progress-bar').style.width = scrolled + '%';
});

// Form input validation
function validateName(inputId) {
    let input = document.getElementById(inputId);
    let value = input.value;
    let regex = /^[A-Za-z ]*$/;

    if (!regex.test(value)) {
        alert("Please enter only alphabetic characters in the name field.");
        input.value = value.replace(/[^A-Za-z ]/g, ''); // Remove invalid characters
    }
}

function validateEmail(inputId) {
    const emailField = document.getElementById(inputId);
    // Email pattern ensuring domain has at least 5 characters
    const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9-]{5,}\.[a-zA-Z]{2,}$/;

    if (!emailPattern.test(emailField.value)) {
        emailField.setCustomValidity("Please enter a valid email address!");
    } else {
        emailField.setCustomValidity("");
    }
}

document.addEventListener('DOMContentLoaded', function() {
    // Check if the current page is not contact.html
    if (!window.location.pathname.endsWith('/assets/html_files/contact.html')) {

        // Text message length validation
        const contactForm = document.getElementById('contact-form');
        const messageInput = document.getElementById('message');
        const minLength = 50; // Minimum length for the message

        if (contactForm && messageInput) {
            // Update text color based on input length
            messageInput.addEventListener('input', function() {
                const currentLength = messageInput.value.length;
                messageInput.style.color = currentLength < minLength ? 'red' : 'black';
            });

            // Validate form submission
            contactForm.addEventListener('submit', function(event) {
                if (messageInput.value.length < minLength) {
                    event.preventDefault();
                    alert('Your message must be at least 50 characters long.');
                }
            });
        }
    }
});

document.addEventListener('DOMContentLoaded', function () {
    const minLength = 50;

    // Check if current page is contact.html
    if (window.location.pathname.endsWith('/assets/html_files/contact.html')) {

        // Main contact form validation
        const contactForm = document.getElementById('contact-form');
        const messageInput = document.getElementById('message');

        if (contactForm && messageInput) {
            messageInput.addEventListener('input', function () {
                const currentLength = messageInput.value.length;
                messageInput.style.color = currentLength < minLength ? 'red' : 'black';
            });

            contactForm.addEventListener('submit', function (event) {
                if (messageInput.value.length < minLength) {
                    event.preventDefault();
                    alert('Your message must be at least 50 characters long.');
                }
            });
        }

        // Footer contact form validation
        const footerForm = document.getElementById('footer-contact-form');
        const footerMessage = document.getElementById('footer-message');

        if (footerForm && footerMessage) {
            footerMessage.addEventListener('input', function () {
                const currentLength = footerMessage.value.length;
                footerMessage.style.color = currentLength < minLength ? 'red' : 'black';
            });

            footerForm.addEventListener('submit', function (event) {
                if (footerMessage.value.length < minLength) {
                    event.preventDefault();
                    alert('Your message must be at least 50 characters long.');
                }
            });
        }
    }
});

// Load components from the JSON files
function loadComponents(jsonFile) {
    fetch(jsonFile)
        .then(response => response.json())
        .then(data => {
            const container = document.getElementById('components-container');
            data.forEach(component => {
                const box = document.createElement('div');
                box.className = 'box';
                box.innerHTML = `
                    <h1>${component.title}</h1>
                    <div class="preview">
                        <a href="${component.previewLink}" title="Live Preview" target="_blank">
                            <img src="../images/link.png">
                        </a>
                    </div>
                    <div class="source">
                        <a href="${component.sourceLink}" title="Source Code" target="_blank">
                            <img src="../images/github.png">
                        </a>
                    </div>
                `;
                container.appendChild(box);
            });
        })
        .catch(error => console.error(`Error loading components from ${jsonFile}:`, error));
}

// Get the JSON file to load from the HTML data attribute
const jsonFile = document.currentScript.getAttribute('data-json-file');
if (jsonFile) {
    loadComponents(jsonFile);
}