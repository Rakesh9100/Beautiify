const foodOptions = {
    maggi: {
        icon: "🍜",
        name: "Cheesy Masala Maggi",
        description: "A warm, spicy bowl of comfort for rainy evenings.",
        tag: "Comfort food",
        price: "₹60",
        unit: "bowls",
        review: "One bite, and suddenly the whole day feels better.",
        image: "https://images.unsplash.com/photo-1569718212165-3a8278d5f624?auto=format&fit=crop&w=900&q=80",
        alt: "A comforting bowl of noodles"
    },
    pizza: {
        icon: "🍕",
        name: "Classic Cheese Pizza",
        description: "Golden, cheesy slices made for sharing.",
        tag: "Cheesy goodness",
        price: "₹180",
        unit: "slices",
        review: "Extra cheese, a crispy crust, and absolutely no regrets.",
        image: "https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&w=900&q=80",
        alt: "Freshly baked pizza"
    },
    coffee: {
        icon: "☕",
        name: "Iced Vanilla Coffee",
        description: "Smooth coffee, a little sweetness, and a slow morning.",
        tag: "Cafe favourite",
        price: "₹140",
        unit: "cups",
        review: "A little caffeine and a little moment of peace.",
        image: "https://images.unsplash.com/photo-1461023058943-07fcbe16d735?auto=format&fit=crop&w=900&q=80",
        alt: "A glass of iced coffee"
    },
    cupcake: {
        icon: "🧁",
        name: "Strawberry Cupcake",
        description: "A sweet little treat topped with strawberry frosting.",
        tag: "Sweet treat",
        price: "₹90",
        unit: "cupcakes",
        review: "Too pretty to eat, but too delicious not to.",
        image: "https://images.unsplash.com/photo-1486427944299-d1955d23e34d?auto=format&fit=crop&w=900&q=80",
        alt: "Cupcakes with decorative frosting"
    },
    sushi: {
        icon: "🍣",
        name: "Fresh Salmon Sushi",
        description: "Delicate bites for a fresh little meal.",
        tag: "Fresh pick",
        price: "₹240",
        unit: "pieces",
        review: "Small bites, lovely flavours, and a very happy mood.",
        image: "https://images.unsplash.com/photo-1579871494447-9811cf80d66c?auto=format&fit=crop&w=900&q=80",
        alt: "A plate of sushi"
    }
};

const ratingIcons = document.querySelectorAll(".rating-icon");
const foodType = document.getElementById("foodType");
const ratingBadge = document.getElementById("ratingBadge");
const ratingCaption = document.getElementById("ratingCaption");
const ratingHint = document.getElementById("ratingHint");
const resetRating = document.getElementById("resetRating");
const dishPhoto = document.getElementById("dishPhoto");
const foodRating = document.getElementById("foodRating");

let savedRating = 0;

function getRatingCaption(rating) {
    const captions = {
        0: "Ready for a rating",
        1: "Not my favourite",
        2: "Could be better",
        3: "Pretty good!",
        4: "Pretty delicious!",
        5: "Absolutely loved it!"
    };

    return captions[rating];
}

function updateRating(rating) {
    ratingIcons.forEach((button) => {
        const value = Number(button.dataset.rating);
        const isActive = value <= rating;
        const isSelected = value === savedRating;

        button.classList.toggle("is-active", isActive);
        button.classList.toggle("is-selected", isSelected);
        button.setAttribute("aria-pressed", String(isSelected));
    });

    ratingBadge.textContent = `${rating.toFixed(1)} / 5`;
    ratingCaption.textContent = getRatingCaption(rating);
    ratingHint.textContent = rating === 0
        ? "Choose your favourite"
        : `Rating: ${rating} out of 5`;
}

function showSavedRating() {
    updateRating(savedRating);
}

function updateFood() {
    const food = foodOptions[foodType.value];

    document.getElementById("dishName").textContent = food.name;
    document.getElementById("dishDescription").textContent = food.description;
    document.getElementById("dishTag").textContent = food.tag;
    document.getElementById("dishPrice").textContent = food.price;
    document.getElementById("reviewText").textContent = food.review;

    ratingIcons.forEach((button) => {
        button.textContent = food.icon;
        button.setAttribute(
            "aria-label",
            `${button.dataset.rating} out of 5 ${food.unit}`
        );
    });

    foodRating.setAttribute("aria-label", `Rate ${food.name} from 1 to 5`);

    dishPhoto.style.opacity = "0.4";
    dishPhoto.onload = () => {
        dishPhoto.style.opacity = "1";
    };
    dishPhoto.onerror = () => {
        dishPhoto.style.opacity = "1";
    };
    dishPhoto.src = food.image;
    dishPhoto.alt = food.alt;

    savedRating = 0;
    showSavedRating();
}

ratingIcons.forEach((button) => {
    const rating = Number(button.dataset.rating);

    button.addEventListener("mouseenter", () => {
        updateRating(rating);
    });

    button.addEventListener("focus", () => {
        updateRating(rating);
    });

    button.addEventListener("click", () => {
        savedRating = rating;
        showSavedRating();
    });

    button.addEventListener("keydown", (event) => {
        if (event.key === "Escape") {
            button.blur();
            showSavedRating();
        }
    });
});

foodRating.addEventListener("mouseleave", showSavedRating);

foodRating.addEventListener("focusout", (event) => {
    if (!foodRating.contains(event.relatedTarget)) {
        showSavedRating();
    }
});

foodType.addEventListener("change", updateFood);

resetRating.addEventListener("click", () => {
    savedRating = 0;
    showSavedRating();
});

updateFood();
