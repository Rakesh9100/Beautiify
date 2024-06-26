const dark = document.querySelector("#dark-theme");
const light = document.querySelector("#light-theme");
const defaultT = document.querySelector("#default-theme");

dark.addEventListener("click", () => {
    document.body.classList.add("dark-theme");
});

light.addEventListener("click", () => {
    document.body.classList.remove("dark-theme");
});

defaultT.addEventListener("click", () => {
    if (
        window.matchMedia &&
        window.matchMedia("(prefers-color-scheme: dark)").matches
    ) {
        document.body.classList.add("dark-theme");
    } else {
        document.body.classList.remove("dark-theme");
    }
});
