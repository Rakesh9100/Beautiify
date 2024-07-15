let modalBox = document.getElementById("modalbox");
function show_modal(){
    setTimeout(()=>{
        modalBox.style.display="block";
    }, 2000)
}

function close_modal(){
    modalBox.style.display="none";
}