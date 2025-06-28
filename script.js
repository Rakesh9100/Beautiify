// Load the components categories from the JSON file
document.addEventListener('DOMContentLoaded', () => {
    // Check if the current file is 'index.html'
    if (window.location.pathname.endsWith('index.html') || window.location.pathname === '/') {
        fetch('./components.json')
            .then(response => response.json())
            .then(data => {
                const container = document.querySelector('.container');
                data.forEach(component => {
                    const zoomEffectDiv = document.createElement('div');
                    zoomEffectDiv.classList.add('zoom-effect');

                    const boxDiv = document.createElement('div');
                    boxDiv.classList.add('box');

                    const anchor = document.createElement('a');
                    anchor.href = component.href;
                    anchor.target = '_blank';

                    const contentDiv = document.createElement('div');
                    contentDiv.classList.add('content');

                    const icon = document.createElement('i');
                    icon.className = component.icon;

                    const title = document.createElement('h2');
                    title.textContent = component.title;

                    contentDiv.appendChild(icon);
                    contentDiv.appendChild(title);
                    anchor.appendChild(contentDiv);
                    boxDiv.appendChild(anchor);
                    zoomEffectDiv.appendChild(boxDiv);
                    container.appendChild(zoomEffectDiv);
                });
            })
            .catch(error => console.error('Error loading components:', error));
    }
});

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

// Function to filter components
function filterComponents() {
    var input, filter, components, i;
    input = document.getElementById('componentSearch');
    filter = input.value.toUpperCase().trim();
    components = document.querySelectorAll('.container .box');
    console.log(filter)
    console.log(components)

    let selected_components = 0;
    for (i = 0; i < components.length; i++) {
        var component = components[i];
        var h2 = component.querySelector('h2');
        var componentName = h2.textContent || h2.innerText;

        if (componentName.toUpperCase().indexOf(filter) > -1) {
            component.style.display = "flex";
            selected_components++;
        } else {
            component.style.display = "none";
        }
    }
    if (selected_components === 0) {
        document.querySelector(".no-results").style.display = "flex";
    } else {
        document.querySelector(".no-results").style.display = "none";
    }
}

// Voice command in search bar feature
const searchBar = document.querySelector("#searchBar");
const searchBarInput = searchBar ? searchBar.querySelector("input") : null;

// The speech recognition interface lives on the browser’s window object
const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;

if (SpeechRecognition) {
    console.log("Your Browser supports speech Recognition");

    const recognition = new SpeechRecognition();
    recognition.continuous = true;

    if (searchBar && searchBarInput) {
        searchBar.insertAdjacentHTML("beforeend", '<button type="button"><i class="fas fa-microphone"></i></button>');
        searchBarInput.style.paddingRight = "50px";

        const micBtn = searchBar.querySelector("button");
        const micIcon = micBtn.firstElementChild;

        micBtn.addEventListener("click", micBtnClick);

        function micBtnClick() {
            if (micIcon.classList.contains("fa-microphone")) { // Start Voice Recognition
                recognition.start(); // First time you have to allow access to mic!
            } else {
                recognition.stop();
            }
        }

        recognition.addEventListener("start", startSpeechRecognition);

        function startSpeechRecognition() {
            micIcon.classList.remove("fa-microphone");
            micIcon.classList.add("fa-microphone-slash");
            searchBarInput.focus();
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
            searchBarInput.dispatchEvent(new Event("input", { bubbles: true }));
        }
    }
} else {
    console.log("Your Browser does not support speech Recognition");
    info.textContent = "Your Browser does not support Speech Recognition";
}

// JavaScript to highlight the active section in the navbar
document.addEventListener("DOMContentLoaded", function () {
    const homeLink = document.querySelector('.nav-menu a[href="#home"]');
    const componentsLink = document.querySelector('.nav-menu a[href="#components"]');

    // Check if elements exist before adding event listeners
    const componentsSection = document.getElementById('components');

    // Proceed only if all required elements exist
    if (homeLink && componentsLink && componentsSection) {
        componentsLink.addEventListener('click', (event) => {
            event.preventDefault();
            componentsSection.scrollIntoView({
                behavior: 'smooth'
            });
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
    }
    // If elements are missing, silently do nothing
});
