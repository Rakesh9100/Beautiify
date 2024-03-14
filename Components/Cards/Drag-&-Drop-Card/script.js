const dropItem = document.getElementById('drop-item');

new Sortable(dropItem, {
    animation: 350,
    dragClass: "sortable-drag"
});