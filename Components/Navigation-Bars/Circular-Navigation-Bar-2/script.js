document.getElementById('menuButton').addEventListener('click', function() {
    const menu = document.getElementById('circleMenu');
    if (menu.style.display === 'block') {
        menu.style.transform = 'scale(0)';
        setTimeout(() => {
            menu.style.display = 'none';
        }, 500);
    } else {
        menu.style.display = 'block';
        setTimeout(() => {
            menu.style.transform = 'scale(1)';
        }, 0);
    }
});