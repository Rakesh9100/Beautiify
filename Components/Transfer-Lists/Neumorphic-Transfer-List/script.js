let availableListData = [
    { text: "Item 1", id: "item1" },
    { text: "Item 2", id: "item2" },
    { text: "Item 3", id: "item3" },
    { text: "Item 4", id: "item4" },
    { text: "Item 5", id: "item5" },
];

let selectedListData = [];

// Function to create a list item
function createListItem(itemData) {
    const listItem = document.createElement("div");
    listItem.classList.add("list-item");
    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.classList.add("item-checkbox");
    checkbox.id = itemData.id;

    const label = document.createElement("label");
    label.setAttribute("for", itemData.id);
    label.classList.add("neu-subheading");
    label.textContent = itemData.text;

    listItem.appendChild(checkbox);
    listItem.appendChild(label);

    return listItem;
}

// Function to render list items dynamically
function renderListItems(listId, listItemsData) {
    const listContainer = document.getElementById(listId);
    // Clear the existing items in the list
    listContainer.innerHTML = "";
    console.log();
    // Use map function to create list item elements
    const listItemElements = listItemsData.map((itemData) =>
        createListItem(itemData)
    );

    // Append list item elements to the container
    listItemElements.forEach((listItemElement) =>
        listContainer.appendChild(listItemElement)
    );
}

function transferAllRight() {
    selectedListData.push(...availableListData);
    availableListData = [];
    console.log("selectedListData", selectedListData);
    console.log("availableListData", availableListData);
    renderListItems("available-items", availableListData);
    renderListItems("selected-items", selectedListData);
}

function transferAllLeft() {
    availableListData.push(...selectedListData);
    selectedListData = [];
    console.log("selectedListData", selectedListData);
    console.log("availableListData", availableListData);
    renderListItems("available-items", availableListData);
    renderListItems("selected-items", selectedListData);
}

function transferCheckedRight() {
    const selectedItems = availableListData.filter((item) => {
        const checkbox = document.getElementById(item.id);
        return checkbox.checked;
    });
    console.log("selectedItems", selectedItems);

    // Add selected items to the selected list
    selectedListData.push(...selectedItems);

    // Remove selected items from the available list
    availableListData = availableListData.filter((item) => {
        return !selectedItems.find((selectedItem) => selectedItem.id === item.id);
    });

    console.log("selectedListData", selectedListData);
    console.log("availableListData", availableListData);

    // Render updated lists
    renderListItems("available-items", availableListData);
    renderListItems("selected-items", selectedListData);
}

function transferCheckedLeft() {
    const selectedItems = selectedListData.filter((item) => {
        const checkbox = document.getElementById(item.id);
        return checkbox.checked;
    });
    console.log("selectedItems", selectedItems);

    // Add selected items to the selected list
    availableListData.push(...selectedItems);

    // Remove selected items from the available list
    selectedListData = selectedListData.filter((item) => {
        return !selectedItems.find((selectedItem) => selectedItem.id === item.id);
    });

    console.log("selectedListData", selectedListData);
    console.log("availableListData", availableListData);

    // Render updated lists
    renderListItems("available-items", availableListData);
    renderListItems("selected-items", selectedListData);
}

renderListItems("available-items", availableListData);
renderListItems("selected-items", []);
