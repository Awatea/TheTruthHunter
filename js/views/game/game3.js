/* functionality */
import app from '../../utils/app';

/* content */
import GameView from './gameView';
import Game3view from './game3-view';

/**
 * Type 3 game page presenter, add logic for move-buttons
 */
export default (state) => {
	
	const game3 = new Game3view(state);

	game3.goToPrevPage = () => {
		let waitAMinute = confirm('Вы уверены, что хотите остановить игру?');
		if (waitAMinute) {
			app.showGreeting();
		}
	};

	game3.goToNextPage = (answer) => {
		const gamePage = new GameView(game3.state);
		gamePage.checkAnswers(answer);
	};

	return game3.element;
};
