var inputs = document.getElementsByTagName('input');

for (var i = 0; i < inputs.length; i++) {
	inputs[i].addEventListener('focus', function () {
		this.previousSibling.previousSibling.classList.remove('fadeIn');
		this.previousSibling.previousSibling.classList.add('fadeOut');
	});

	inputs[i].addEventListener('blur', function () {
		if (!this.value.length) {
			this.previousSibling.previousSibling.classList.remove('fadeOut');
			this.previousSibling.previousSibling.classList.add('fadeIn');
		}
	});
}