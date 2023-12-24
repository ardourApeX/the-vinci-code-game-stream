window.currentStep = 0;
window.maxStep = 4;
const userNameElem = document.querySelector('.username');

function onFormSubmit(e) {
	e.preventDefault();
	const formData = new FormData(e.target);
	const formDataObject = Object.fromEntries(formData.entries());
	console.log(formDataObject);
	if (formDataObject.name) {
		displayUsername(formDataObject.name);
	}
	// window.username = formDataObject.name || 'Guest';
	changeStepNumber();
}
function displayUsername(name) {
	document.querySelector('.username').innerText = name;
}
function onOptionSelected(e) {
	console.log(e.target.name);
	const eventType = e.target.name;
	switch (eventType) {
		case 'start': {
			changeStepNumber();
			const newGame = new Game();
			newGame.start();
			break;
		}
		case 'leaderboard': {
			console.log('Show leaderboard');
			break;
		}
		case 'changeUsername': {
			if (userNameElem) {
				userNameElem.contentEditable = true;
				userNameElem.style.textOverflow = 'unset';
				userNameElem.focus();
			}
			break;
		}
		default: {
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
	window.currentStep += 1;
}

document.addEventListener('click', (e) => {
	if (
		e.target.name !== 'changeUsername' &&
		!e.target.classList.contains('username') &&
		userNameElem.contentEditable
	) {
		displayUsername(userNameElem.innerText);
		userNameElem.contentEditable = false;
	}
});
