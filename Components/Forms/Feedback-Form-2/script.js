document.addEventListener('DOMContentLoaded', function() {
    const feedbackForm = document.getElementById('feedback-form');
    const submitButton = document.querySelector("#feedback-form button[type='submit']");
    const thankYouMessage = document.getElementById('thank-you-message');
    const errorMessage = document.getElementById('error-message');
    const ratingStars = [...document.getElementsByClassName("rating__star")];

    function allFieldsFilled() {
        const inputs = feedbackForm.querySelectorAll("input[type='text'], input[type='email'], textarea");
        for (let input of inputs) {
            if (!input.value.trim()) {
                return false;
            }
        }
        return true;
    }

    function ratingSelected() {
        for (let star of ratingStars) {
            if (star.classList.contains('fas')) {
                return true;
            }
        }
        return false;
    }

    feedbackForm.addEventListener('submit', function(event) {
        event.preventDefault();
        if (allFieldsFilled() && ratingSelected()) {
            thankYouMessage.style.display = 'block';
            errorMessage.style.display = 'none';
            setTimeout(function() {
                thankYouMessage.style.display = 'none';
            }, 3000);
            feedbackForm.reset();
            for (let star of ratingStars) {
                star.classList.remove('fas');
                star.classList.add('far');
            }
        } else {
            thankYouMessage.style.display = 'none';
            errorMessage.style.display = 'block';
            setTimeout(function() {
                errorMessage.style.display = 'none';
            }, 3000);
        }
    });

    feedbackForm.addEventListener("input", function() {
        if (allFieldsFilled()) {
            submitButton.removeAttribute("disabled");
        } else {
            submitButton.setAttribute("disabled", "disabled");
        }
    });

    function executeRating(stars) {
        const starClassActive = "rating__star fas fa-star";
        const starClassInactive = "rating__star far fa-star";
        stars.map((star, index) => {
            star.onclick = () => {
                for (let i = 0; i < stars.length; ++i) {
                    stars[i].className = i <= index ? starClassActive : starClassInactive;
                }
            };
        });
    }

    executeRating(ratingStars);

    document.querySelector('.close').addEventListener('click', function() {
        document.getElementById('modal').style.display = 'none';
    });

    window.onclick = function(event) {
        if (event.target == document.getElementById('modal')) {
            document.getElementById('modal').style.display = 'none';
        }
    };
});
