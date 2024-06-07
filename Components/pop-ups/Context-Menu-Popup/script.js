document.addEventListener('contextmenu', function(event) {
    event.preventDefault();

    const contextMenu = document.querySelector('.context-menu');
    contextMenu.style.top = `${event.clientY}px`;
    contextMenu.style.left = `${event.clientX}px`;
    contextMenu.style.display = 'block';
});

document.addEventListener('click', function(e) {
    // if (e.target.getAttribute('class')=='menu-item') return;
    const contextMenu = document.querySelector('.context-menu');
    contextMenu.style.display = 'none';
});
