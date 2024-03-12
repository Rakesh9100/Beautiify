
// To show and hide password

let password = document.getElementById("password");
let showpass = document.querySelector(".show_password");
let check = document.getElementById("check");


check.addEventListener("click", () => {
    if (check.checked) {
        password.type = "text";
        showpass.style.opacity = "1";
    }
    else {
        password.type = "password";
        showpass.style.opacity = "0.8";
    }
})

// main animation
let main_container = document.querySelector(".main-container");
let Signinlink = document.querySelector(".Signinlink");
let signuplink = document.querySelector(".signuplink");

signuplink.addEventListener("click", () => {
    main_container.classList.add("animated_signin");
    main_container.classList.remove("animated_signup");
})
Signinlink.addEventListener("click", () => {
    main_container.classList.add("animated_signup");
    main_container.classList.remove("animated_signin");
})

// gsap animations
let tl = gsap.timeline();
tl.from(".Login", {
    x: "-50vw",
    opacity: 0,
    duration: 0.8
})
tl.from(".Sign_Up", {
    x: "50vw",
    opacity: 0,
    duration: 0.8
})
tl.from(".circle1", {
    opacity: 0,
    duration: 0.5
})
tl.from(".circle2", {
    opacity: 0,
    duration: 0.5
})
tl.from(".circle1_child3", {
    opacity: 0,
    duration: 0.5
})
tl.from(".circle2_child3", {
    opacity: 0,
    duration: 0.5
})
gsap.from(".google", {
    scale: 1.1,
    duration: 0.5,
    stagger: 0.2
})
