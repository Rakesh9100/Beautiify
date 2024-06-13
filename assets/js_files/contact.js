function myfun() {
    var correct = /^[A-Za-z]+$/;
    var emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    var a = document.getElementById("cform").value;
    var email = document.getElementById("cmail").value;
    
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
    else if(!a.match(correct)){
        document.getElementById("message").innerHTML = "**ONLY ALPHABETS ARE ALLOWED";
        return false;
    }
    else if (!emailPattern.test(email)) {
        document.getElementById("mailmessage").innerHTML = "**Please enter valid email";
        return false;
    }
    return true;
}
