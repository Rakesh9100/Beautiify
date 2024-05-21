const circle = document.querySelector('.circle');
const container = document.querySelector('.drag-and-drop');

let initialX = circle.offsetLeft;
let initialY = circle.offsetTop;

container.addEventListener('mousedown', (event) => {
  const shiftX = event.clientX - circle.offsetLeft;
  const shiftY = event.clientY - circle.offsetTop;

  container.addEventListener('mousemove', (moveEvent) => {
    circle.style.left = `${moveEvent.clientX - shiftX}px`;
    circle.style.top = `${moveEvent.clientY - shiftY}px`;
  });
});

container.addEventListener('mouseup', () => {
  container.removeEventListener('mousemove', (event) => {});
});
