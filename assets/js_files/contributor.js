const cont = document.getElementById('contributor');
let currentPage = 1; // Start from page 1
let isLoading = false; // Flag to track loading state
let hasMore = true; // Flag to track if there's more data to load

// Loading spinner element
const loadingSpinner = document.getElementById('loading-spinner');

// Error message element
const errorMessage = document.getElementById('error-message');

// Intersection Observer for infinite scroll
const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.1
};

// Use when one page is loaded, and then scroll down to load more
const intersectionObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting && !isLoading && hasMore) {
            // If intersecting, not in loading state, and has more data to load
            fetchContributors(currentPage);
        }
    });
}, observerOptions);

// Lazy loading observer for avatars
const lazyLoadObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const img = entry.target;
            img.src = img.dataset.src;
            img.classList.remove('lazy');
            lazyLoadObserver.unobserve(img);
        }
    });
}, observerOptions);

// Loads a single page of contributors
async function fetchContributors(pageNumber) {
    if (isLoading) return;

    isLoading = true;
    const perPage = 20; // Number of items per page
    const apiUrl = '/.netlify/functions/contributors';

    try {
        // Show loading spinner at the bottom
        loadingSpinner.style.display = 'block';

        const response = await fetch(`${apiUrl}?page=${pageNumber}&per_page=${perPage}`);

        if (!response.ok) {
            throw new Error(`Failed to fetch contributors. Status: ${response.status}`);
        }

        const contributorsData = await response.json();

        // Check if we have more data to load
        hasMore = contributorsData.length === perPage;

        // Create and append contributor cards
        await displayContributors(contributorsData);

        currentPage++;
    } catch (error) {
        errorMessage.style.display = 'block';
        console.error('Error fetching contributors:', error);
    } finally {
        isLoading = false;
        loadingSpinner.style.display = 'none';

        // Add observer to the last card for infinite scroll
        const allCards = cont.querySelectorAll('.contributor-card');
        if (allCards.length > 0) {
            intersectionObserver.observe(allCards[allCards.length - 1]);
        }
    }
}

// Displays the contributors on the page
async function displayContributors(contributors) {
    const fragment = document.createDocumentFragment();

    for (const contributor of contributors) {
        if (contributor.login === 'Rakesh9100') continue; // Skip owner

        const contributorCard = document.createElement('div');
        contributorCard.classList.add('contributor-card');

        // Create avatar with lazy loading
        const avatarImg = document.createElement('img');
        avatarImg.classList.add('lazy');
        avatarImg.src = '../images/avatar.svg'; // Add a placeholder image
        avatarImg.dataset.src = contributor.avatar_url;
        avatarImg.alt = `${contributor.login}'s Picture`;

        const loginLink = document.createElement('a');
        loginLink.href = contributor.html_url;
        loginLink.target = '_blank';
        loginLink.appendChild(avatarImg);

        const displayName = contributor.login;

        const nameDiv = document.createElement('div');
        nameDiv.classList.add('contributor-name');
        nameDiv.textContent = displayName;

        const contributionsCountBubbleDiv = document.createElement('div');
        contributionsCountBubbleDiv.classList.add('contributions-count-bubble');
        contributionsCountBubbleDiv.textContent = contributor.contributions;

        contributorCard.appendChild(loginLink);
        contributorCard.appendChild(nameDiv);
        contributorCard.appendChild(contributionsCountBubbleDiv);
        fragment.appendChild(contributorCard);

        // Observe the image for lazy loading
        lazyLoadObserver.observe(avatarImg);
    }

    cont.appendChild(fragment);
}

// Initial load
fetchContributors(currentPage);