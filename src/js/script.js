function onFormSubmit(e) {
	e.preventDefault();
	const formData = new FormData(e.target);
	const formDataObject = Object.fromEntries(formData.entries());
	window.username = formDataObject.name;
}
