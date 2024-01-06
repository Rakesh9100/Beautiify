export class Item {
	// Class property initialization with default values.
	DOM = {
		el: null,       // Reference to the main DOM element with class 'gtext'.
		inner: null,    // Reference to the inner DOM elements with class 'gtext__box-inner'.
		innerWrap: null // Reference to the inner DOM element parent with class 'gtext__box'.
	};
	totalCells = 1;     // Default value for the total number of cells.

	/**
	 * Constructor for the Item class.
	 * @param {HTMLElement} DOM_el - The main DOM element for the item.
	 * @param {number} totalCells - The total number of cells for the effect.
	 */
	constructor(DOM_el, totalCells) {
		// Assign the provided DOM element to the 'el' property of the 'DOM' object.
		this.DOM.el = DOM_el;

		this.totalCells = totalCells; // Set the total number of cells.

		// Create the layout with 'totalCells' number of inner elements.
		this.layout();

		// Set initial CSS values and update them on window resize.
		this.setCSSValues();
		window.addEventListener('resize', () => this.setCSSValues());
	}

	/**
	 * Generates the HTML layout for the inner elements based on 'totalCells'.
	 */
	layout() {
		let newHTML = '';
		for (let i = 0; i < this.totalCells; ++i) {
			newHTML += `<span class="gtext__box"><span class="gtext__box-inner">${this.DOM.el.dataset.text}</span></span>`;
		}

		this.DOM.el.innerHTML = newHTML;
		this.DOM.innerWrap = this.DOM.el.querySelectorAll('.gtext__box');
		this.DOM.inner = this.DOM.el.querySelectorAll('.gtext__box-inner');
	}

	/**
	 * Sets CSS custom properties and initial positions for the elements.
	 */
	setCSSValues() {
		// Get the computed width of the first inner element.
		const computedWidth = window.getComputedStyle(this.DOM.inner[0]).width;

		// Set custom properties for text width and splits (totalCells).
		this.DOM.el.style.setProperty('--text-width', computedWidth);
		this.DOM.el.style.setProperty('--gsplits', this.totalCells);

		// Calculate offset for positioning each inner element and apply left positioning.
		const offset = parseFloat(computedWidth) / this.totalCells;
		this.DOM.inner.forEach((inner, pos) => {
			gsap.set(inner, { left: offset * -pos });
		});
	}
}
