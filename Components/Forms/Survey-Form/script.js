document.getElementById('surveyForm').addEventListener('submit', function (event) {
    event.preventDefault();
    alert('Survey submitted!'); // You can replace this with your own logic for handling the form data
    resetForm();
});

function resetForm() {
    // Clear input fields and rating after submission
    var form = document.getElementById('surveyForm');
    form.reset();
    var stars = document.querySelectorAll('.rating input');
    stars.forEach(function (star) {
        star.checked = false;
    });
}