document.addEventListener('DOMContentLoaded', () => {
    const popupOverlay = document.getElementById('popupOverlay');
    const closeBtn = document.getElementById('closeBtn');

    // Show the popup after 3 seconds
    setTimeout(() => {
        popupOverlay.style.display = 'flex';
    }, 3000);

    // Close the popup
    closeBtn.addEventListener('click', () => {
        popupOverlay.style.display = 'none';
    });

    // Close the popup if user clicks outside of it
    popupOverlay.addEventListener('click', (event) => {
        if (event.target === popupOverlay) {
            popupOverlay.style.display = 'none';
        }
    });
});
