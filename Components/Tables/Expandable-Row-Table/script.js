function toggleDetails(row) {
    const nextRow = row.nextElementSibling;
    const icon = row.querySelector('.expand-icon');

    if (nextRow.classList.contains('details')) {
        const isVisible = nextRow.style.display === 'table-row';
        nextRow.style.display = isVisible ? 'none' : 'table-row';
        icon.classList.toggle('open', !isVisible);
    }
}
