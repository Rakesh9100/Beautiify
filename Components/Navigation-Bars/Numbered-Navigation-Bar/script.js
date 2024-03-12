const outers = Array.from(document.getElementsByClassName('outer'));
let active = null;
let queue = Promise.resolve();

const h = document.getElementsByClassName('highlight')[0];
const init = outers[0].style.width;

const u = outers[1].getBoundingClientRect().x - outers[0].getBoundingClientRect().x;

outers.forEach((o, i) => {
    o.dataset.idx = i;
    o.addEventListener('click', () => activate(o));
})

function activate(thing) {
    if (active === thing) return;
    queue = queue.then(() => {
        return new Promise(r => {
            moveTo(thing);
            minimize(thing).then(() => expand(thing)).then(r);
            active = thing;
            thing.classList.add('active');
        })
    })
}

function minimize(thing) {
    if (!active) return Promise.resolve();
    active.classList.remove('active');
    return new Promise(r => {
        active.addEventListener('transitionend', r, { once: true })
        active.style.width = init;
        h.style.width = init;
    });
}

function moveTo(target) {
    h.style.transform = `translateX(${u * target.dataset.idx}px)`
}

function expand(target) {
    return new Promise(r => {
        target.addEventListener('transitionend', r, { once: true });
        const width = target.getElementsByClassName('inner')[0].getBoundingClientRect().width + 'px';
        target.style.width = width;
        h.style.width = width;
    })
}

setTimeout(() => activate(outers[0]), 500)
