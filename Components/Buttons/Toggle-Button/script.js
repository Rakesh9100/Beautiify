'use strict'

const toggle = document.getElementById('toggle');
const body = document.querySelector('body');
toggle.onclick = function () {
    toggle.classList.toggle('active');
    body.classList.toggle('active');
}