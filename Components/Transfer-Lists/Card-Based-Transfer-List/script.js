document.addEventListener('DOMContentLoaded', () => {
    const availableItems = document.getElementById('available-items');
    const selectedItems = document.getElementById('selected-items');
    const availableListContainer = document.getElementById('available-list-container');
    const selectedListContainer = document.getElementById('selected-list-container');

    const projects = [
        'Project Apollo',
        'Project Zeus',
        'Project Hera',
        'Project Athena',
        'Project Ares',
        'Project Poseidon',
        'Project Hades',
        'Project Artemis',
        'Project Demeter',
        'Project Dionysus'
    ];

    function createCard(text) {
        const card = document.createElement('div');
        card.classList.add('card');
        card.textContent = text;
        card.draggable = true;
        card.addEventListener('dragstart', () => {
            card.classList.add('dragging');
        });
        card.addEventListener('dragend', () => {
            card.classList.remove('dragging');
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

    function handleDrop(event) {
        event.preventDefault();
        const draggedCard = document.querySelector('.dragging');
        const dropZone = event.currentTarget;
        dropZone.classList.remove('drop-zone');
        if (dropZone !== draggedCard.parentElement) {
            dropZone.appendChild(draggedCard);
        }
    }

    function handleDragOver(event) {
        event.preventDefault();
        event.currentTarget.classList.add('drop-zone');
    }

    function handleDragLeave(event) {
        event.currentTarget.classList.remove('drop-zone');
    }

    availableListContainer.addEventListener('dragover', handleDragOver);
    availableListContainer.addEventListener('dragleave', handleDragLeave);
    availableListContainer.addEventListener('drop', handleDrop);

    selectedListContainer.addEventListener('dragover', handleDragOver);
    selectedListContainer.addEventListener('dragleave', handleDragLeave);
    selectedListContainer.addEventListener('drop', handleDrop);

    populateList(availableItems, projects);
});