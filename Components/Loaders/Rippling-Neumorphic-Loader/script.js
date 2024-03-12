const loader = document.querySelector(".loader_center");

let debounce = false;

function loader_anim() {
    if (debounce) return;
    debounce = true;
    loaderAnimate();
    createWave();
}

setInterval(function () {
    loader_anim();
}, 1000);

function loaderAnimate() {
    loader.classList.add("clicked");
    setTimeout(function () {
        loader.classList.remove("clicked");
        debounce = false;
    }, 700);
}

function createWave() {
    const wave = document.createElement("div");
    wave.classList.add("wave");
    document.body.appendChild(wave);
    setTimeout(function () {
        wave.remove();
    }, 7000);
}
