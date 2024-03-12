const animated_text = document.querySelector(".animated_text")

const Text_change = () => {
    setTimeout(() => {
        animated_text.textContent = "Web Developer"
    }, 0)
    setTimeout(() => {
        animated_text.textContent = "Web Designer"
    }, 4000)
    setTimeout(() => {
        animated_text.textContent = "Data Analyst"
    }, 8000)
}
Text_change();
setInterval(Text_change, 12000)