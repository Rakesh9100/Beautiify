const inputs = document.querySelectorAll('input');
const submitBtn = document.getElementById('submit-btn');
const submissionMessage = document.getElementById('submission-message');

// Check if all inputs are filled
inputs.forEach(input => {
    input.addEventListener('input', () => {
        let allFilled = true;

        for (let input of inputs) {
            if (input.value.trim() === '') {
                allFilled = false;
                break;
            }
        }

        // Toggle the 'active' class based on all fields being filled
        if (allFilled) {
            submitBtn.classList.add('active');
        } else {
            submitBtn.classList.remove('active');
        }
    });
});

// Clear inputs and show the submission message
submitBtn.addEventListener('click', () => {
    if (submitBtn.classList.contains('active')) {
        // Clear input fields
        inputs.forEach(input => (input.value = ''));

        // Show the submission message
        submissionMessage.style.display = 'block';

        // Hide the message after 3 seconds
        setTimeout(() => {
            submissionMessage.style.display = 'none';
        }, 3000);

        // Disable button after clearing
        submitBtn.classList.remove('active');
    }
});
