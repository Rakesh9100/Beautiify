const searchForm = document.querySelector("#search-form");
const searchFormInput = searchForm.querySelector("input");
const info = document.querySelector(".info");

const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition; // if none exists -> undefined

if (SpeechRecognition) {
    console.log("Your Browser supports speech Recognition");

    const recognition = new SpeechRecognition();
    recognition.continuous = true;

    searchForm.insertAdjacentHTML("beforeend", '<button type="button"><i class="fas fa-microphone"></i></button>');
    searchFormInput.style.paddingRight = "50px";

    const micBtn = searchForm.querySelector("button");
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

    recognition.addEventListener("start", startSpeechRecognition); // <=> recognition.onstart = function() {...}
    function startSpeechRecognition() {
        micIcon.classList.remove("fa-microphone");
        micIcon.classList.add("fa-microphone-slash");
        searchFormInput.focus();
        console.log("Voice activated, SPEAK");
    }

    recognition.addEventListener("end", endSpeechRecognition); // <=> recognition.onend = function() {...}
    function endSpeechRecognition() {
        micIcon.classList.remove("fa-microphone-slash");
        micIcon.classList.add("fa-microphone");
        searchFormInput.focus();
        console.log("Speech recognition service disconnected");
    }

    recognition.addEventListener("result", resultOfSpeechRecognition);
    function resultOfSpeechRecognition(event) {
        const current = event.resultIndex;
        const transcript = event.results[current][0].transcript;

        if (transcript.toLowerCase().trim() === "stop recording") {
            recognition.stop();
        }
        else if (!searchFormInput.value) {
            searchFormInput.value = transcript;
        }
        else {
            if (transcript.toLowerCase().trim() === "go") {
                searchForm.submit();
            }
            else if (transcript.toLowerCase().trim() === "reset input") {
                searchFormInput.value = "";
            }
            else {
                searchFormInput.value = transcript;
            }
        }

    }

    info.textContent = 'Voice Commands: "stop recording", "reset input", "go"';

}
else {
    console.log("Your Browser does not support speech Recognition");
    info.textContent = "Your Browser does not support Speech Recognition";
}