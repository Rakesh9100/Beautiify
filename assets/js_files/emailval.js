document.addEventListener('DOMContentLoaded', function () {
    const emailInput = document.getElementById('email');
    const emailError = document.getElementById('emailError');
    const form = document.querySelector('form[name="Beautiify Contact"]');

    // Basic email format validation using a regular expression
    function validateEmail(email) {
        const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        return emailPattern.test(email);
    }

    // Show error message
    function showError(message) {
        emailError.textContent = message;
        emailError.style.display = 'block';
    }

    // Clear error message
    function clearError() {
        emailError.textContent = '';
        emailError.style.display = 'none';
    }

    // Add event listener for email input blur event
    emailInput.addEventListener('blur', function () {
        const email = emailInput.value.trim();
        if (email === '') {
            showError('Email is required.');
        } else if (!validateEmail(email)) {
            showError('Please enter a valid email address.');
        } else {
            clearError();
        }
    });

    // Form submission validation
    form.addEventListener('submit', function (event) {
        const email = emailInput.value.trim();
        if (email === '' || !validateEmail(email)) {
            showError('Please enter a valid email address.');
            event.preventDefault();
        }
    });
});
