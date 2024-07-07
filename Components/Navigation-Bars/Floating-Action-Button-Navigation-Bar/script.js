document.addEventListener('click', function(event) {
    const fabMenu = document.getElementById('nav-items');
    const fab = document.getElementById('fab');
    const isClickInside = fab.contains(event.target) || fabMenu.contains(event.target);

    if (!isClickInside) {
        fabMenu.classList.remove('open');
    }
});

function toggleFabMenu() {
    const fabMenu = document.getElementById('nav-items');
    fabMenu.classList.toggle('open');
}

function navigateTo(element) {
    highlightActiveItem(element);
}

function highlightActiveItem(element) {
    const menuItems = document.querySelectorAll('.nav-item');
    menuItems.forEach(item => {
        item.classList.remove('active');
    });
    element.classList.add('active');
}
