let modalBox = document.getElementById("modalbox");
function show_modal(){
    setTimeout(()=>{
        modalBox.style.display="block";
    }, 2000)
} // interval of 2 seconds

function close_modal(){
    modalBox.style.display="none";
}