document.addEventListener('DOMContentLoaded', function () {
    const emojiContainer = document.querySelector('.emoji-container');
    const emojis = ['😂', '🤣', '😁', '🤭', '😈', '👻', '💀', '👀', '🐼', '🐸', '🐣', '🐳', '🦀', '🌝', '🌟', '🌈', '🌞', '🥑', '🌽', '🍔', '🍟', '🍺', '🍕', '🍿', '🗿', '💎', '🍀', '🚀', '🗽', '🗼', '🏯'];

    const numberOfLines = Math.floor(window.innerWidth / 40);

    for (let i = 0; i < numberOfLines; i++) {
        const line = document.createElement('div');
        line.classList.add('emoji-line');
        const emojiDiv = document.createElement('div');

        for (let j = 0; j < 30; j++) {
            const randomEmoji = emojis[Math.floor(Math.random() * emojis.length)];
            const emojiElement = document.createElement('div');
            emojiElement.classList.add('emoji');
            emojiElement.textContent = randomEmoji;
            emojiDiv.appendChild(emojiElement);
        }

        line.appendChild(emojiDiv);
        line.appendChild(emojiDiv.cloneNode(true));
        emojiContainer.appendChild(line);
    }
});
