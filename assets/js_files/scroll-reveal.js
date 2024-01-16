ScrollReveal({
	reset: false,
	distance: "40px",
	duration: 2500,
	delay: 400,
});

ScrollReveal().reveal(".box, .paragraph, .started", {
	delay: 400,
	origin: "top",
});

ScrollReveal().reveal("#contributor, .sub-head, .footer", {
	delay: 500,
	origin: "top",
});
