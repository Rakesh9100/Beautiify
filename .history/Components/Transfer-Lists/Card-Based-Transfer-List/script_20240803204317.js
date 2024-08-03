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

    function createCard(text) {
        const card = document.createElement('div');
        card.classList.add('card');
        card.textContent = text;
        card.addEventListener('click', () => {
            card.classList.toggle('selected');
        });
        return card;
    }

    function populateList(container, items) {
        container.innerHTML = '';
        items.forEach(item => {
            const card = createCard(item);
            container.appendChild(card);
        });
    }

    function transferSelectedItems(source, target) {
        const selectedCards = Array.from(source.querySelectorAll('.selected'));
        selectedCards.forEach(card => {
            card.classList.remove('selected');
            target.appendChild(card);
        });
    }

    addButton.addEventListener('click', () => {
        transferSelectedItems(availableItems, selectedItems);
    });

    removeButton.addEventListener('click', () => {
        transferSelectedItems(selectedItems, availableItems);
    });

    populateList(availableItems, menuItems);
});