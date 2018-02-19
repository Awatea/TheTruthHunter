/* functionality */
import {loadQuestions, fillStats} from '../../utils/game';

/* content */
import header from '../../utils/header';
import AbstractView from '../abstract-view';

/* data */
import * as data from '../../data/data';

/**
 * Type 1 game page view
 */
export default class Game1view extends AbstractView {
	
	constructor(state) {
		super();
		this.state = state;
	}

	get template() {
		return `${header(this.state)}

		    <div class="game">
		      	<p class="game__task">
					Укажи для каждого утверждения, правда или вымысел?
				</p>
		      	<form class="game__content">

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
		const form = this.element.querySelector(`.game__content`);
		form.addEventListener(`change`, () => {
			const radio1 = form.querySelector(`[name="question1"]:checked`);
			const radio2 = form.querySelector(`[name="question2"]:checked`);
		    if (radio1 && radio2) {
				this.goToNextPage(radio1, radio2);
		    }
		});
	}

	goToPrevPage() {
		throw new Error(`You need to define this function first`);
	}

	goToNextPage() {
		throw new Error(`You need to define this function first`);
	}
}
