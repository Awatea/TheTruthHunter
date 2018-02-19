/* functionality */
import {loadQuestions, fillStats} from '../../utils/game';

/* content */
import header from '../../utils/header';
import AbstractView from '../abstract-view';

/* data */
import * as data from '../../data/data';

/**
 * Type 2 game page view
 */
export default class Game2view extends AbstractView {
	
	constructor(state) {
		super();
		this.state = state;
	}

	get template() {
		return `${header(this.state)}

			<div class="game">
				<p class="game__task">
					Правда или вымысел?
				</p>
				<form class="game__content  game__content--wide">

					${loadQuestions(data.levels[this.state.currentLevel])}

				</form>
				<div class="stats">
					<ul class="stats">

						${fillStats(this.state)}

					</ul>
				</div>
			</div>`.trim();
	}

	bind() {
		/**
		 * back to greeting page
		 */
		const backButton = this.element.querySelector('.header__back');
		backButton.onclick = () => {
			this.goToPrevPage();
		};

		/**
		 * go to the next page if answer is chosen
		 */
		const nextPageButton = this.element.querySelectorAll('.game__answer input');
		nextPageButton.forEach((element) => {
			element.onclick = () => {
				const radio1 = this.element.querySelector(`[name="question1"]:checked`);
				this.goToNextPage(radio1);
			};
		});
	}

	goToPrevPage() {
		throw new Error(`You need to define this function first`);
	}

	goToNextPage() {
		throw new Error(`You need to define this function first`);
	}
}
