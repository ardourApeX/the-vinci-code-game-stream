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
		this.messageLabel = document.getElementById('game-message');
		this.generatedNumbers = [];
		this.leaderboard = [];
		this.enteredNumbers = [];
		this.level = 1;
		this.score = 0;
		this.numpad.addEventListener('click', (event) =>
			this.onButtonPressed(event)
		);
	}
	static renderLeaderBoard() {
		const table = document.querySelector('.leaderboard');
		let innerHTML = '';
		innerHTML += `
					<tr>
						<th>Name</th>
						<th>Score</th>
					</tr>`;

		window.leaderboard.forEach((details) => {
			innerHTML += `
					<tr>
						<td>${details.name}</td>
						<td>${details.score}</td>
					</tr>`;
		});
		table.innerHTML += `<div class="leaderboard-table"><table>${innerHTML}</table></div>`;
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
			console.log('Generating number');
			this.generatedNumbers.push(this.randomNumber());
		}
		console.log('these are numbers  ', this.generatedNumbers);

		this.displayCountDown();
	}

	displayCountDown() {
		let index = 0;
		console.log('here i am inside coutndown');

		const countDownId = setInterval(() => {
			console.log('inside setinterval', {
				index,
				level: this.level,
				countDownId,
			});
			if (index < this.level) {
				this.container.innerText = this.generatedNumbers[index];
				if (index == 0) {
					console.log('inside ');
					this.messageLabel.innerText = 'Remember the sequence of number';

					this.container.classList.add('glow');
					this.container.classList.remove('hidden');
				}
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
		if (this.container.classList.contains('hidden')) {
			this.messageLabel.innerText = 'Press the buttons in the same sequence';
		} else {
			this.messageLabel.innerText = 'Remember the sequence of number';
		}
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
			this.score += 1;
			this.messageLabel.innerText = `Level ${this.level} cleared`;
			this.updateLevel(this.level + 1);
			this.toggleVisibility(this.numpad);
			this.gameLoop();
		} else {
			this.showGameOver();
		}
	}
	showGameOver() {
		this.messageLabel.innerText = `Wrong selection. Game Over !!`;
		this.toggleVisibility(this.numpad);
		window.leaderboard.push({ name: window.username, score: this.score });
		localStorage.setItem('leaderboard', JSON.stringify(window.leaderboard));
		setTimeout(() => {
			window.changeStepNumber(3);
			Game.renderLeaderBoard();
		}, 1000);
	}
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
