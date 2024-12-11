const inputs = document.querySelectorAll('input');
const submitBtn = document.getElementById('submit-btn');
const submissionMessage = document.getElementById('submission-message');

inputs.forEach(input => {
    input.addEventListener('input', () => {
        let allFilled = true;

        for (let input of inputs) {
            if (input.value.trim() === '') {
                allFilled = false;
                break;
            }
        }

        if (allFilled) {
            submitBtn.classList.add('active');
        } else {
            submitBtn.classList.remove('active');
        }
    });
});

submitBtn.addEventListener('click', () => {
    if (submitBtn.classList.contains('active')) {
        inputs.forEach(input => (input.value = ''));
        submissionMessage.style.display = 'block';
        setTimeout(() => {
            submissionMessage.style.display = 'none';
        }, 3000);
        submitBtn.classList.remove('active');
    }
});