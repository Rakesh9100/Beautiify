document.getElementById('openPopup').addEventListener('click', function() {
    document.getElementById('popupContainer').classList.add('visible');
});

document.getElementById('closePopup').addEventListener('click', function() {
    document.getElementById('popupContainer').classList.remove('visible');
});

document.addEventListener('click', function(event) {
    if (event.target === document.getElementById('popupContainer')) {
        document.getElementById('popupContainer').classList.remove('visible');
    }
});
