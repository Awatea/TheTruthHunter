/* functionality */
import app from '../../utils/app';

/* content */
import GameView from './gameView';
import Game2view from './game2-view';

/**
 * Type 2 game page presenter, add logic for move-buttons
 */
export default (state) => {
	
	const game2 = new Game2view(state);

	game2.goToPrevPage = () => {
		let waitAMinute = confirm('Вы уверены, что хотите остановить игру?');
		if (waitAMinute) {
			app.showGreeting();
		}
	};

	game2.goToNextPage = (radio1) => {
		const gamePage = new GameView(game2.state);
		gamePage.checkAnswers(radio1.value);
	};

	return game2.element;
};
