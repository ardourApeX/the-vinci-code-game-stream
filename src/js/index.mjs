/*
1. Get the user's name
2. Show a menu
3. Menu items:
  a. Start New Game
  b. See Leaderboard
  c. Update Name
*/

class Game {
	constructor() {
		this.container = document.querySelector('.animate');
		this.numpad = document.getElementById('numpad');
		this.generatedNumbers = [];
		this.enteredNumbers = [];
		this.level = 2;
		this.score = 0;
		this.numpad.addEventListener('click', this.onButtonPressed(event));
	}
	randomNumber() {
		return Math.floor(Math.random() * 10);
	}
	updateLevel(level = 1) {
		this.generatedNumbers = [];
		this.enteredNumbers = [];
		this.level = level;
	}
	start() {
		this.gameLoop();
	}
	// displayMenu() {
	// 	this.container.innerHTML = `Welcome ${this.name},
	// <ol>
	//   <li data-val="1">Start New Game</li>
	//   <li data-val="2">See Leaderboard</li>
	//   <li data-val="3">Update Name</li>
	// </ol>`;
	// 	this.container.removeEventListener('click', this.handleMenuClick);
	// 	this.container.addEventListener('click', this.handleMenuClick);
	// }

	generateNumbersForLevel() {
		for (let i = 0; i < this.level; i++) {
			this.generatedNumbers.push(this.randomNumber());
		}
		this.container.classList.add('glow');
		this.displayCountDown();
	}

	displayCountDown() {
		let index = 0;
		console.log(this.generatedNumbers);
		const countDownId = setInterval(() => {
			if (index < this.level) {
				this.container.innerText = this.generatedNumbers[index];
				index++;
			} else {
				clearInterval(countDownId);
				this.askForUserInput();
			}
		}, 2000);
	}
	askForUserInput() {
		this.toggleVisibility(this.container);
		this.toggleVisibility(this.numpad);
	}
	toggleVisibility(elem) {
		console.log(elem.classList);
		if (elem.classList.contains('hidden')) {
			elem.classList.remove('hidden');
		} else {
			elem.classList.add('hidden');
		}
	}
	onButtonPressed(e) {
		const userinput = e.target.name;
		// this.userImput.push(userImput);
	}
	// displayNumbersForLevel() {
	// 	for (let i = 0; i < this.level; i++) {
	// 		alert(this.generatedNumbers[i]);
	// 	}
	// }
	// getNumbersFromUser() {
	// 	for (let i = 0; i < this.level; i++) {
	// 		let enteredValue = prompt(
	// 			'Enter values in order one at a time: (press enter after every value)'
	// 		);
	// 		if (enteredValue === '' || enteredValue === null) {
	// 			enteredValue = NaN;
	// 		}
	// 		this.enteredNumbers.push(Number(enteredValue));
	// 	}
	// }
	// verifyLevel() {
	// 	for (let i = 0; i < this.level; i++) {
	// 		if (this.enteredNumbers[i] !== this.generatedNumbers[i]) return false;
	// 	}
	// 	return true;
	// }
	gameLoop() {
		this.generateNumbersForLevel();
		// this.displayNumbersForLevel();
		// this.getNumbersFromUser();
		// if (this.verifyLevel()) {
		// 	this.updateLevel(this.level + 1);
		// 	this.gameLoop();
		// } else {
		// 	alert(`Your score is: ${this.level}`);
		// }
	}
}
window.Game = Game;
