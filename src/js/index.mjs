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
		this.level = 1;
		this.score = 0;
		this.numpad.addEventListener('click', (event) =>
			this.onButtonPressed(event)
		);
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

	generateNumbersForLevel() {
		for (let i = 0; i < this.level; i++) {
			this.generatedNumbers.push(this.randomNumber());
		}
		this.displayCountDown();
	}

	displayCountDown() {
		let index = 0;
		this.container.innerText = this.generatedNumbers[index];
		if (index == 0) {
			console.log('inside ');
			this.container.classList.add('glow');
			index++;
		}
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
		if (elem.classList.contains('hidden')) {
			elem.classList.remove('hidden');
		} else {
			elem.classList.add('hidden');
		}
	}
	onButtonPressed(e) {
		this.enteredNumbers.push(Number(e.target.value));
		if (this.enteredNumbers.length === this.level) {
			this.resultHandler(this.verifyLevel());
		}
	}

	verifyLevel() {
		for (let i = 0; i < this.level; i++) {
			if (this.enteredNumbers[i] !== this.generatedNumbers[i]) return false;
		}
		return true;
	}
	resultHandler(cleared) {
		if (cleared) {
			console.log(`Level ${this.level} cleared`);
			this.updateLevel(this.level + 1);
		} else {
			console.log('Game Over!!');
		}
	}
	showGameOver() {}
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
