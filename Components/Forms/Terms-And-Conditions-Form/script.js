document.addEventListener('DOMContentLoaded', () => {
    const openModalBtn = document.getElementById('openModalBtn');
    const modal = document.getElementById('termsModal');
    const closeModalBtn = document.getElementsByClassName('close')[0];
    const acceptTerms = document.getElementById('acceptTerms');
    const submitBtn = document.getElementById('submitBtn');
    const sections = document.querySelectorAll('.section h2');

    openModalBtn.addEventListener('click', () => {
        modal.style.display = 'block';
    });

    closeModalBtn.addEventListener('click', () => {
        modal.style.display = 'none';
    });

    window.addEventListener('click', (event) => {
        if (event.target === modal) {
            modal.style.display = 'none';
        }
    });

    acceptTerms.addEventListener('change', (event) => {
        submitBtn.disabled = !event.target.checked;
    });

    sections.forEach(section => {
        section.addEventListener('click', () => {
            const content = section.nextElementSibling;
            content.style.display = content.style.display === 'block' ? 'none' : 'block';
        });
    });

    document.getElementById('termsForm').addEventListener('submit', (event) => {
        event.preventDefault();
        if (acceptTerms.checked) {
            alert('Form submitted successfully!');
        } else {
            alert('You must agree to the terms and conditions before submitting.');
        }
    });
});
