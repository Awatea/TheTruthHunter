/* functionality */
import * as game from '../../utils/game';
import app from '../../utils/app';

/* content */
import AbstractView from '../abstract-view';
import game1 from './game1';
import game2 from './game2';
import game3 from './game3';

/* data */
import * as data from '../../data/data';


let timerInterval;
/**
 * Game page presenter, #game
 */
export default class GameView extends AbstractView {
	
	constructor(state = JSON.parse(JSON.stringify(data.initialData))) {
		super();
		this.state = state;
	}

	loadGameLevel(i = this.state.currentLevel) {
		this.stopTimer();
		/**
		* if that's the last level or player has no more lives - load stats page
		*/
		if (i == data.levels.length || this.state.lives < 1) {
			app.showStats(this.state);
		} else {
			/**
			* in other cases - load the game page with appropriate type
			*/
			let actualPage;

			if (data.levels[i].type == 'game1') {
				actualPage = game1(this.state);
			} else if (data.levels[i].type == 'game2') {
				actualPage = game2(this.state);
			} else if (data.levels[i].type == 'game3') {
				actualPage = game3(this.state);
			}
			this.renderPage(actualPage);
			this.startTimer(actualPage);
			return;
		}
	}

	checkAnswers(answer1, answer2) {
		/**
		 * check current level
		 */
		const i = this.state.currentLevel;
		const level = !i ? 0 : i;

		/**
		 * if we got any answers - check them and check timer
		 */
		if (answer1 || answer1 === false) {
			if (document.querySelector('.game__timer')) {
				const timer = document.querySelector('.game__timer').innerHTML;
				const result = game.checkResult(data.levels[level], answer1, answer2);
				this.state.currentLevel++;
				this.state = game.getResultTime(result, this.state, timer);
			}
		}
		this.loadGameLevel();
	}

	startTimer(selector) {
		timerInterval = setInterval(() => {
			let newTime = +selector.querySelector('.game__timer').innerHTML;
			if (newTime > 0) {
				if (selector.querySelector('.game__timer')) {
					--newTime;
					selector.querySelector('.game__timer').innerHTML = newTime;
				}
			} else {
				this.checkAnswers(false, false);
				this.loadGameLevel();
			}
		}, 1000);
	}

	stopTimer() {
		clearInterval(timerInterval);
	}

	init() {
		this.loadGameLevel();
	}
}
