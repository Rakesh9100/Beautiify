const form = document.getElementById('shipment-form');
const submissionMessage = document.getElementById('submission-message');

form.addEventListener('submit', (e) => {
    e.preventDefault();
    form.reset();
    submissionMessage.style.display = 'block';
    setTimeout(() => {
        submissionMessage.style.display = 'none';
    }, 3000);
});