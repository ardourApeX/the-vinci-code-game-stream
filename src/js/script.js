window.currentStep = 0;
window.maxStep = 4;
window.username = 'Guest';
const leaderboard = localStorage.getItem('leaderboard');

if (leaderboard) {
	window.leaderboard = JSON.parse(leaderboard);
} else {
	window.leaderboard = [];
}
const userNameElem = document.querySelector('.username');

function onFormSubmit(e) {
	e.preventDefault();
	const formData = new FormData(e.target);
	const formDataObject = Object.fromEntries(formData.entries());
	console.log(formDataObject);
	displayUsername(formDataObject.name || 'Guest');
	window.username = formDataObject.name || 'Guest';
	changeStepNumber();
}
function displayUsername(name) {
	document.querySelector('.username').innerText = name;
}
function onOptionSelected(e) {
	const eventType = e.target.name;
	switch (eventType) {
		case 'start': {
			changeStepNumber();
			const newGame = new Game();
			newGame.start();
			break;
		}
		case 'leaderboard': {
			changeStepNumber(3);
			Game.renderLeaderBoard();
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
		window.username = userNameElem.innerText;
		userNameElem.contentEditable = false;
	}
});
