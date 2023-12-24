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

function onKeyPressed(e) {
	console.log(e.target.name);
}

const elem = document.querySelector('.animate');
const newGame = new Game(elem);
newGame.start();
// setInterval(() => {
// 	elem.classList.remove('glow');
// 	const temp = Math.floor(Math.random() * 10);
// 	console.log(temp);
// 	elem.innerText = temp;
// 	elem.classList.add('glow');
// }, 2000);
