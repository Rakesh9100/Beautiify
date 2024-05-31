function toggleWelcomePopUp() {
    document.addEventListener('DOMContentLoaded', () => {
        document.querySelector(".pop-up-container").classList.add('active')
    })

    document.querySelector('.close-btn').addEventListener('click', () => {
        document.querySelector(".pop-up-container").classList.remove('active')
    })
}
toggleWelcomePopUp()