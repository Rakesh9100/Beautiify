function myfun() {
    var correct = /^[A-Za-z]+$/;
    var a = document.getElementById("cform").value;
    if (a == " ") {
        document.getElementById("message").innerHTML = "**Please fill user name";
        return false;
    }

    else if (a.length < 3) {
        document.getElementById("message").innerHTML = "**Minimum length should be 3";
        return false;
    }

    else if (a.length > 20) {
        document.getElementById("message").innerHTML = "**Maximum length allowed is 20";
        return false;
    }

    else if (a.match(correct)) {
        true;
    }

    else {
        document.getElementById("message").innerHTML = "**ONLY ALPHABETS ARE ALLOWED";
        return false;
    }
}
