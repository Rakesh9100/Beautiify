// script.js

document.addEventListener('DOMContentLoaded', () => {
    const availableItems = document.getElementById('available-items');
    const selectedItems = document.getElementById('selected-items');
    const addButton = document.getElementById('add');
    const removeButton = document.getElementById('remove');

    const menuItems = [
        'Grilled Vegetable Salad',
        'Margherita Pizza',
        'French Fries',
        'Caesar Salad',
        'Vegetable Stir Fry',
        'Garlic Bread',
        'Tomato Soup',
        'Pasta Primavera',
        'Vegetable Samosa',
        'Caprese Salad'
    ];

    function createListItem(text) {
        const li = document.createElement('li');
        li.textContent = text;
        li.addEventListener('click', () => {
            li.classList.toggle('selected');
        });
        return li;
    }

    function populateList(listElement, items) {
        listElement.innerHTML = '';
        items.forEach(item => {
            const listItem = createListItem(item);
            listElement.appendChild(listItem);
        });
    }

    function transferSelectedItems(source, target) {
        const selectedItems = Array.from(source.querySelectorAll('.selected'));
        selectedItems.forEach(item => {
            item.classList.remove('selected');
            target.appendChild(item);
        });
    }

    addButton.addEventListener('click', () => {
        transferSelectedItems(availableItems, selectedItems);
    });

    removeButton.addEventListener('click', () => {
        transferSelectedItems(selectedItems, availableItems);
    });

    // Initial population of available items
    populateList(availableItems, menuItems);
});
