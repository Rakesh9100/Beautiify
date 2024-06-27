document.addEventListener('DOMContentLoaded', () => {
    const themeSwitchCheckbox = document.querySelector('.theme-switch__checkbox');

    themeSwitchCheckbox.addEventListener('change', () => {
        if (themeSwitchCheckbox.checked) {
            document.body.classList.add('dark-mode');
        } else {
            document.body.classList.remove('dark-mode');
        }
    });
});
