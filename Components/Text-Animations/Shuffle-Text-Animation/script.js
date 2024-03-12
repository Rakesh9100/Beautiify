const prefix = 'Web Development is ';
const features = [
    'amazing',
    'interesting',
    'a good learning opportunity',
    'fascinating',
    'awesome'
].map(s => `${s}.`);
const delay = 2;
const step = 1;
const tail = 5;
const timeout = 75;

const p = document.createElement('p');
document.body.appendChild(p);

const colors = [
    'red',
    'green',
    'blue',
    'yellow',
    'cyan',
    'magenta',
];

function getRandomColor() {
    return colors[Math.floor(Math.random() * colors.length)];
}

function getRandomChar() {
    return String.fromCharCode(Math.random() * (127 - 33) + 33);
}

function getRandomColoredString(n) {
    const fragment = document.createDocumentFragment();
    for (let i = 0; i < n; i++) {
        const char = document.createElement('span');
        char.textContent = getRandomChar();
        char.style.color = getRandomColor();
        fragment.appendChild(char);
    }
    return fragment;
}

const $ = {
    text: '',
    prefixP: -tail,
    featureI: 0,
    featureP: 0,
    direction: 'forward',
    delay,
    step,
};

function render() {
    const feature = features[$.featureI];

    if ($.step) {
        $.step--;
    } else {
        $.step = step;
        if ($.prefixP < prefix.length) {
            if ($.prefixP >= 0) {
                $.text += prefix[$.prefixP];
            }
            $.prefixP++;
        } else {
            if ($.direction === 'forward') {
                if ($.featureP < feature.length) {
                    $.text += feature[$.featureP];
                    $.featureP++;
                } else {
                    if ($.delay) {
                        $.delay--;
                    } else {
                        $.direction = 'backward';
                        $.delay = delay;
                    }
                }
            } else {
                if ($.featureP > 0) {
                    $.text = $.text.slice(0, -1);
                    $.featureP--;
                } else {
                    $.featureI = ($.featureI + 1) % features.length;
                    $.direction = 'forward';
                }
            }
        }
    }

    p.textContent = $.text;
    p.appendChild(getRandomColoredString(
        $.prefixP < prefix.length ?
            Math.min(tail, tail + $.prefixP) :
            Math.min(tail, feature.length - $.featureP)));
    setTimeout(render, timeout);
}
setTimeout(render, 500);
