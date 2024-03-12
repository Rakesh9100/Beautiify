let circle = document.getElementById("circle");
const getnumber = document.getElementById("num");
let num = 50;
let num1 = 2000;

// update from user input values
function update1() {
    let userip1 = document.getElementById("ip1");
    num1 = userip1.value;
    runCounter(num1)
    // console.log(num , num1)

}

// update from user input values
function update() {
    let userip = document.getElementById("ip");
    num = userip.value;
    runCounter(num1)
    // console.log(num , num1)

}

// used to convert percentage to circular completion
function loading(num) {
    let round = 472 - (4.72 * num);
    circle.style.strokeDashoffset = round;
}

// Used to make sync between circular animation and inner percentage
function runCounter(duration) {
    let userip = document.getElementById("ip");
    let count = 1;
    let interval = duration / num;

    function updateCounter() {
        getnumber.textContent = count;
        loading(count);
        if (count < num) {
            count++;
            setTimeout(updateCounter, interval);
        }
    }
    updateCounter();
}

runCounter(2000)

