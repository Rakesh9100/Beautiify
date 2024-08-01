var popup = document.getElementById('popup');
document.getElementById('btn').addEventListener('click', function show() {
    popup.style.display = "block";
});
document.getElementById('close').addEventListener('click', function hide() {
    popup.style.display = "none";
});
