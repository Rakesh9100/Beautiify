document.addEventListener("DOMContentLoaded", function () {
    setTimeout(function () {
        document.querySelector("body").classList.add("loaded");
    }, 500)
});

let calcScrollValue = () => {
    let scrollProg = document.getElementById("progress");
    let pos = document.documentElement.scrollTop;
    let calcHeight =
        document.documentElement.scrollHeight -
        document.documentElement.clientHeight;
    let scrollValue = Math.round((pos * 100) / calcHeight);
    if (pos > 100) {
        scrollProg.style.display = "grid";
    } else {
        scrollProg.style.display = "none";
    }
    scrollProg.addEventListener("click", () => {
        document.documentElement.scrollTop = 0;
    });
    scrollProg.style.background = `conic-gradient(#0063ba ${scrollValue}%, #d499de ${scrollValue}%)`;
};

window.addEventListener('scroll', function () {
    var scrollToTopButton = document.getElementById('progress');
    if (window.pageYOffset > 200) {
        scrollToTopButton.style.display = 'block';
    } else {
        scrollToTopButton.style.display = 'none';
    }
});

window.onscroll = calcScrollValue;
window.onload = calcScrollValue;

document.getElementById("year").textContent = new Date().getFullYear();

// Function to filter components
function filterComponents() {
    var input, filter, components, i;
    input = document.getElementById('componentSearch');
    filter = input.value.toUpperCase().trim();
    components = document.querySelectorAll('.container .box');
    console.log(filter)
    console.log(components)

    for (i = 0; i < components.length; i++) {
        var component = components[i];
        var h2 = component.querySelector('h2');
        var componentName = h2.textContent || h2.innerText;

        if (componentName.toUpperCase().indexOf(filter) > -1) {
            component.style.display = "flex";
        } else {
            component.style.display = "none";
        }
    }
}

// Voice command in search bar feature
const searchBar = document.querySelector("#searchBar");
const searchBarInput = searchBar.querySelector("input");

// The speech recognition interface lives on the browser’s window object
const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;

if (SpeechRecognition) {
    console.log("Your Browser supports speech Recognition");

    const recognition = new SpeechRecognition();
    recognition.continuous = true;

    searchBar.insertAdjacentHTML("beforeend", '<button type="button"><i class="fas fa-microphone"></i></button>');
    searchBarInput.style.paddingRight = "50px";

    const micBtn = searchBar.querySelector("button");
    const micIcon = micBtn.firstElementChild;

    micBtn.addEventListener("click", micBtnClick);
    function micBtnClick() {
        if (micIcon.classList.contains("fa-microphone")) { // Start Voice Recognition
            recognition.start(); // First time you have to allow access to mic!
        }
        else {
            recognition.stop();
        }
    }

    recognition.addEventListener("start", startSpeechRecognition);
    function startSpeechRecognition() {
        micIcon.classList.remove("fa-microphone");
        micIcon.classList.add("fa-microphone-slash");
        searchFormInput.focus();
        console.log("Voice activated, SPEAK");
    }

    recognition.addEventListener("end", endSpeechRecognition);
    function endSpeechRecognition() {
        micIcon.classList.remove("fa-microphone-slash");
        micIcon.classList.add("fa-microphone");
        searchBarInput.focus();
        console.log("Speech recognition service disconnected");
    }

    recognition.addEventListener("result", resultOfSpeechRecognition);
    function resultOfSpeechRecognition(event) {
        const current = event.resultIndex;
        const transcript = event.results[current][0].transcript;
        newtranscript = transcript.endsWith('.') ? transcript.slice(0, -1) : transcript;
        console.log(newtranscript)
        searchBarInput.value = newtranscript;
        filterComponents();
    }
}
else {
    console.log("Your Browser does not support speech Recognition");
    info.textContent = "Your Browser does not support Speech Recognition";
}

// JavaScript to highlight the active section in the navbar
document.addEventListener("DOMContentLoaded", function () {
    const homeLink = document.querySelector('.nav-menu a[href="#home"]');
    const componentsLink = document.querySelector('.nav-menu a[href="#components"]');

    const searchBarSection = document.getElementById('searchBar');
    const componentsSection = document.getElementById('components');

    componentsLink.addEventListener('click', (event) => {
        event.preventDefault();
        componentsSection.scrollIntoView({ behavior: 'smooth' });
        componentsLink.style.color = 'red';
        homeLink.style.color = '';
    });

    window.addEventListener('scroll', () => {
        const currentScroll = window.pageYOffset;

        // Adjust the offset accordingly
        const componentsSectionTop = componentsSection.offsetTop - 50;

        if (currentScroll >= componentsSectionTop) {
            componentsLink.style.color = 'red';
            homeLink.style.color = '';
        } else {
            componentsLink.style.color = '';
            homeLink.style.color = 'red';
        }
    });
});
