document.addEventListener('DOMContentLoaded', function() {
    // Load existing reviews from localStorage
    loadReviews();

    document.getElementById('reviewForm').addEventListener('submit', function(e) {
        e.preventDefault();
        
        const name = document.getElementById('name').value;
        const review = document.getElementById('review').value;

        if (name && review) {
            const reviewContainer = createReviewElement(name, review);

            // Insert new review before the cont elements
            document.getElementById('new-reviews-container').appendChild(reviewContainer);

            saveReview(name, review);

            document.getElementById('reviewForm').reset();
        }
    });
});

function loadReviews() {
    const reviews = JSON.parse(localStorage.getItem('reviews')) || [];
    const reviewsContainer = document.getElementById('new-reviews-container');

    reviews.forEach(review => {
        const reviewContainer = createReviewElement(review.name, review.text);
        reviewsContainer.appendChild(reviewContainer);
    });
}

function saveReview(name, text) {
    const reviews = JSON.parse(localStorage.getItem('reviews')) || [];
    reviews.push({ name, text });
    localStorage.setItem('reviews', JSON.stringify(reviews));
}

function createReviewElement(name, text) {
    const reviewContainer = document.createElement('div');
    reviewContainer.classList.add('review');

    const reviewName = document.createElement('p');
    reviewName.innerHTML = `<strong>${name}</strong>`;
    reviewContainer.appendChild(reviewName);

    const reviewText = document.createElement('p');
    reviewText.textContent = text;
    reviewContainer.appendChild(reviewText);

    return reviewContainer;
}
