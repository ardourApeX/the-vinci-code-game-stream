window.currentStep = 0;
window.maxStep = 4;
function onFormSubmit(e) {
	e.preventDefault();
	const formData = new FormData(e.target);
	const formDataObject = Object.fromEntries(formData.entries());
	if (formDataObject.name) {
		document.querySelector('.username').innerText = formDataObject.name;
	}
	// window.username = formDataObject.name || 'Guest';
	changeStepNumber();
}
function onOptionSelected(e) {
	console.log(e.target.name);
	const eventType = e.target.name;
	switch (eventType) {
		case 'start': {
			console.log('start the game');
			break;
		}
		case 'leaderboard': {
			console.log('Show leaderboard');
			break;
		}
		case 'changeUsername': {
			const userNameElem = document.querySelector('.username');
			if (userNameElem) {
				userNameElem.contentEditable = true;
				userNameElem.style.textOverflow = 'unset';
			}
			console.log('Change the username ');
			break;
		}
		default: {
			alert('Invalid selection');
			break;
		}
	}
}
function changeStepNumber(newStepNumber = window.currentStep + 1) {
	const activeStep = document.querySelector('.active-step');
	if (activeStep) {
		activeStep.classList.remove('active-step');
	}
	const newActiveStep = document.querySelector(`.step-${newStepNumber}`);
	if (newActiveStep) {
		newActiveStep.classList.add('active-step');
	}
}
