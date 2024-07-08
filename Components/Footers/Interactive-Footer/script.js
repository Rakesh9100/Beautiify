const moreInfoButton = document.querySelector('.more-info-button');
const moreInfoSection = document.querySelector('.more-info');

moreInfoButton.addEventListener('click', () => {
    moreInfoSection.classList.toggle('show');
    if (moreInfoSection.classList.contains('show')) {
        moreInfoButton.textContent = 'Less Info';
    } else {
        moreInfoButton.textContent = 'More Info';
    }
});

const scrollToTopButton = document.querySelector('.scroll-to-top');

scrollToTopButton.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});
