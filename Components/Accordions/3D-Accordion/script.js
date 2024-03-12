document.addEventListener('DOMContentLoaded', function () {
    let cards = document.querySelectorAll('.card');
    cards.forEach(function (card) {
        card.addEventListener('click', function () {
            let details = this.querySelectorAll('.details-1, .details-2');
            details.forEach(function (detail) {
                detail.classList.toggle('unfold');
            });

            let siblingCards = this.parentNode.querySelectorAll('.card:not(:nth-child(' + (Array.prototype.indexOf.call(this.parentNode.children, this) + 1) + '))');
            siblingCards.forEach(function (siblingCard) {
                let siblingDetails = siblingCard.querySelectorAll('.details-1, .details-2');
                siblingDetails.forEach(function (siblingDetail) {
                    siblingDetail.classList.remove('unfold');
                });
                siblingCard.classList.remove('span');
            });

            this.classList.toggle('span');
        });
    });
});