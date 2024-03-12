// Function to filter components
function filtereachComponents() {
    var input, filter, components, i;
    input = document.getElementById('componentSearch');
    filter = input.value.toUpperCase().trim();
    components = document.querySelectorAll('.contain .box');
    console.log(filter)
    console.log(components)

    for (i = 0; i < components.length; i++) {
        var component = components[i];
        var h2 = component.querySelector('h1');
        var componentName = h2.textContent || h2.innerText;

        if (componentName.toUpperCase().indexOf(filter) > -1) {
            component.style.display = "block";
        } else {
            component.style.display = "none";
        }
    }
}