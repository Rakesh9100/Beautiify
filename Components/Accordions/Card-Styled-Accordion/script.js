document.addEventListener("DOMContentLoaded", () => {
    const accordionTriggers = document.querySelectorAll(".accordion-trigger");

    accordionTriggers.forEach((trigger) => {
        trigger.addEventListener("click", () => {
            const parent = trigger.parentElement;
            parent.classList.toggle("active");

            // Close other accordions
            document.querySelectorAll(".accordion-item").forEach((item) => {
                if (item !== parent) {
                    item.classList.remove("active");
                }
            });
        });
    });
});
