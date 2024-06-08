document.addEventListener('DOMContentLoaded', () => {
    const dropdownButton = document.getElementById('dropdownMenuButton');
    const dropdownMenu = document.querySelector('.dropdown-menu');
    const dropdownItems = document.querySelectorAll('.dropdown-item');
    const themeToggleBtn = document.getElementById('themeToggleBtn');
    const body = document.body;

    let focusedIndex = -1;

    dropdownButton.addEventListener('click', () => {
        dropdownMenu.classList.toggle('show');
    });

    document.addEventListener('click', (event) => {
        if (!dropdownButton.contains(event.target) && !dropdownMenu.contains(event.target)) {
            dropdownMenu.classList.remove('show');
            focusedIndex = -1;
            removeFocusFromAllItems();
        }
    });

    document.addEventListener('keydown', (event) => {
        if (dropdownMenu.classList.contains('show')) {
            if (event.key === 'ArrowDown') {
                focusedIndex = (focusedIndex + 1) % dropdownItems.length;
                updateFocusedItem();
            } else if (event.key === 'ArrowUp') {
                focusedIndex = (focusedIndex - 1 + dropdownItems.length) % dropdownItems.length;
                updateFocusedItem();
            } else if (event.key === 'Enter' && focusedIndex >= 0) {
                dropdownItems[focusedIndex].click();
            } else if (event.key === 'Escape') {
                dropdownMenu.classList.remove('show');
                focusedIndex = -1;
                removeFocusFromAllItems();
            }
        }
    });

    dropdownItems.forEach((item, index) => {
        item.addEventListener('mouseenter', () => {
            focusedIndex = index;
            updateFocusedItem();
        });

        item.addEventListener('mouseleave', () => {
            focusedIndex = -1;
            removeFocusFromAllItems();
        });
    });

    themeToggleBtn.addEventListener('click', () => {
        body.classList.toggle('dark-theme');
    });

    function updateFocusedItem() {
        removeFocusFromAllItems();
        if (focusedIndex >= 0) {
            dropdownItems[focusedIndex].classList.add('focused');
        }
    }

    function removeFocusFromAllItems() {
        dropdownItems.forEach(item => item.classList.remove('focused'));
    }
});
