document.addEventListener('DOMContentLoaded', function() {
    drag(document.getElementById("main"));

    function drag(card) {
        var pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;
        card.onmousedown = dragmousedown;

        function dragmousedown(e) {
            e = e || window.event;
            e.preventDefault();
            pos3 = e.clientX;
            pos4 = e.clientY;
            document.onmouseup = closedrag;
            document.onmousemove = carddrag;
        }

        function carddrag(e) {
            e = e || window.event;
            e.preventDefault();
            pos1 = pos3 - e.clientX;
            pos2 = pos4 - e.clientY;
            pos3 = e.clientX;
            pos4 = e.clientY;
            card.style.top = (card.offsetTop - pos2) + "px";
            card.style.left = (card.offsetLeft - pos1) + "px";
        }

        function closedrag() {
            document.onmouseup = null;
            document.onmousemove = null;
        }
    }
});
