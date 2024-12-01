document.addEventListener("DOMContentLoaded", () => {
    const availableProjects = document.getElementById("availableProjects");
    const assignedProjects = document.getElementById("assignedProjects");
    const countAvailable = document.getElementById("countAvailable");
    const countAssigned = document.getElementById("countAssigned");
    const searchAvailable = document.getElementById("searchAvailable");
    const searchAssigned = document.getElementById("searchAssigned");
    const resetBtn = document.getElementById("reset");

    const initialAvailableProjects = [
        'Alpha', 'Beta', 'Gamma', 'Delta',
        'Epsilon', 'Zeta', 'Eta', 'Theta',
        'Iota', 'Kappa', 'Lambda', 'Mu',
        'Nu', 'Xi', 'Omicron', 'Pi'
    ];
    const initialAssignedProjects = []; // Starts empty

    const updateCounters = () => {
        countAvailable.textContent = availableProjects.querySelectorAll(".card").length;
        countAssigned.textContent = assignedProjects.querySelectorAll(".card").length;
    };

    const filterCards = (list, searchInput) => {
        const filter = searchInput.value.toLowerCase();
        const cards = list.querySelectorAll(".card");
        cards.forEach(card => {
            const text = card.textContent.toLowerCase();
            card.style.display = text.includes(filter) ? "" : "none";
        });
    };

    const resetLists = () => {
        availableProjects.innerHTML = '';
        assignedProjects.innerHTML = '';

        initialAvailableProjects.forEach(text => {
            const card = createCard(text);
            availableProjects.appendChild(card);
        });

        // Assigned projects list starts empty
        initialAssignedProjects.forEach(text => {
            const card = createCard(text);
            assignedProjects.appendChild(card);
        });

        attachEventListeners();
        updateCounters();
    };

    const createCard = (text) => {
        const card = document.createElement("div");
        card.className = "card";
        card.draggable = true;
        card.textContent = text;
        card.addEventListener("dragstart", dragStart);
        card.addEventListener("dragend", dragEnd);
        card.addEventListener("click", () => {
            card.classList.toggle("selected");
        });
        return card;
    };

    const dragStart = (event) => {
        event.target.classList.add("dragging");
    };

    const dragEnd = (event) => {
        event.target.classList.remove("dragging");
        updateCounters();
    };

    const attachEventListeners = () => {
        searchAvailable.addEventListener("input", () => {
            filterCards(availableProjects, searchAvailable);
        });

        searchAssigned.addEventListener("input", () => {
            filterCards(assignedProjects, searchAssigned);
        });

        const lists = document.querySelectorAll(".list");
        lists.forEach(list => {
            list.addEventListener("dragover", e => {
                e.preventDefault();
            });

            list.addEventListener("drop", e => {
                e.preventDefault();
                const draggedCard = document.querySelector(".dragging");
                if (draggedCard) {
                    list.appendChild(draggedCard);
                    updateCounters();
                }
            });
        });
    };

    const transferSelectedCards = (fromList, toList) => {
        const selectedCards = [...fromList.querySelectorAll(".card.selected")];
        selectedCards.forEach(card => {
            toList.appendChild(card);
            card.classList.remove("selected");
        });
        updateCounters();
    };

    const moveToAssignedBtn = document.getElementById("moveToAssigned");
    const moveToAvailableBtn = document.getElementById("moveToAvailable");

    moveToAssignedBtn.addEventListener("click", () => {
        transferSelectedCards(availableProjects, assignedProjects);
    });

    moveToAvailableBtn.addEventListener("click", () => {
        transferSelectedCards(assignedProjects, availableProjects);
    });

    resetBtn.addEventListener("click", resetLists);

    resetLists();
});
