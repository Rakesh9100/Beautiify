document.getElementById('surveyForm').addEventListener('submit', function (event) {
    event.preventDefault();
    
    //to prevent user from submitting a zero-star rating
    var ratingInputs = document.querySelectorAll('.rating input');
    var ratingSelected = false;
    
    ratingInputs.forEach(function(input) {
        if (input.checked) {
            ratingSelected = true;
        }
    });
    
    if (!ratingSelected) {
        alert('Please provide a rating before submission!');
        return;
    }
    alert('Survey submitted!'); // In case of successful submission
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
