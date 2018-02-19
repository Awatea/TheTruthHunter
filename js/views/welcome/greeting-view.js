/* functionality */
import {mistakes} from '../../utils/game';
import app from '../../utils/app';

/* content */
import AbstractView from '../abstract-view';


/**
 * Greeting page view, #greeting
 */
export default class GreetingView extends AbstractView {

	constructor () {
		super();
	}

	get template() {
		return `<div class="greeting central--blur">
	    	<div class="greeting__logo"><img src="img/logo-200.png" width="201" height="89" alt="The Truth Hunter"></div>
		    <div class="greeting__challenge">
				<h3>Насколько хорошо ты знаешь факты?</h3>
				<p>
					Правила игры просты:<br>
			    	отличи правду от вымысла и сделай выбор!
				</p>
		    </div>
		    <div class="greeting__continue"><span><img src="img/arrow_right.svg" width="64" height="64" alt="Next"></span></div>
	    </div>`.trim();
	}

	bind() {
		/**
		 * go to the intro page
		 */
		const mainPageButton = this.element.querySelector('.greeting__logo');

		mainPageButton.addEventListener('click', () => {
			this.goToMainPage();
		});
		/**
		 * go to the next page
		 */
		const nextPageButton = this.element.querySelector('.greeting__continue');

		nextPageButton.addEventListener('click', () => {
			this.goToNextPage();
		});
	}

	goToMainPage() {
		app.showIntro();
	}

	goToNextPage() {
		if (mistakes.length) {
			mistakes.length = 0;
		}
		app.showRules();
	}

	init() {
		this.renderPage(this.element);
	}
}
