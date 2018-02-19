/* functionality */
import app from '../../utils/app';

/* content */
import GameView from './gameView';
import Game1view from './game1-view';

/**
 * Type 1 game page presenter, add logic for move-buttons
 */
export default (state) => {
	
	const game1 = new Game1view(state);

	game1.goToPrevPage = () => {
		let waitAMinute = confirm('Вы уверены, что хотите остановить игру?');
		if (waitAMinute) {
			app.showGreeting();
		}
	};

	game1.goToNextPage = (radio1, radio2) => {
		const gamePage = new GameView(game1.state);
		gamePage.checkAnswers(radio1.value, radio2.value);
	};

	return game1.element;
};
