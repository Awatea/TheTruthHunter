/* functionality */
import app from '../../utils/app';

/* content */
import AbstractView from '../abstract-view';

/**
 * Intro page view, #
 */
export default class IntroView extends AbstractView {
	
	constructor() {
		super();
	}

	get template() {
		return `
		<div id="main" class="central__content">
	  	    <div id="intro" class="intro">
	  	    	<h1 class="intro__start">START</h1>
	  	    </div>
	  	</div>
	  `.trim();
	}

	bind() {
		/**
		 * go to the next page
		 */
		const nextPageButton = this.element.querySelector('.intro__start');
		nextPageButton.addEventListener('click', () => {
			this.goToNextPage();
		});
	}

	goToNextPage() {
		app.showGreeting();
	}

	init() {
		this.renderPage(this.element);
	}
}
