function toggleToast() {

    const toaster = document.querySelector('.toast-wrapper')
    toaster.classList.add('active');

    setTimeout(() => {
        toaster.classList.remove('active');
    }, 3000)
}