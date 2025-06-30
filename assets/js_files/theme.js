// Theme switching functionality
document.addEventListener('DOMContentLoaded', function() {
    // Get all color options
    const colorOptions = document.querySelectorAll('.color-option');
    
    // Add click event for each color option
    colorOptions.forEach(option => {
        option.addEventListener('click', function(e) {
            e.preventDefault();
            const color = this.getAttribute('data-color');
            changeBackgroundColor(color);
        });
    });
    
    // Change background color function
    function changeBackgroundColor(color) {
        const body = document.body;
        
        body.classList.remove('purple-bg', 'dark-bg', 'blue-bg', 'green-bg', 'orange-bg');
        
        if (color === 'dark') {
            body.classList.add('dark-mode');
        } else {
            body.classList.remove('dark-mode');
        }
        
        body.classList.add(`${color}-bg`);
        
        // Save user preference to local storage
        localStorage.setItem('preferred-bg-color', color);
    }
    
    // Apply saved color when page loads
    const savedColor = localStorage.getItem('preferred-bg-color');
    if (savedColor) {
        changeBackgroundColor(savedColor);
    } else {
        // Default to purple background
        document.body.classList.add('purple-bg');
    }
});