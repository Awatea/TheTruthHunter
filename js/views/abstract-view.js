/* functionality */
import app from '../utils/app';


/**
 * basic class for any page template
 */
export default class AbstractView {
	
	get template() {
		throw new Error('You need to define this function first');
	}

	/**
	* prepare template for being added to a page
	*/
	_getElementFromTemplate (template) {
		const newDiv = document.createElement(`div`);
		newDiv.innerHTML = template;
		return newDiv;
	}

	render() {
		return this._getElementFromTemplate(this.template);
	}

	/**
	 * display template on main page
	 */
	renderPage (template) {
		const mainContainer = document.querySelector('main.central');
		mainContainer.innerHTML = '';
		mainContainer.appendChild(template);
	}

	bind() {
		throw new Error(`You need to define this function first`);
	}

	/**
	 * create element if doesn't exists
	 */
	get element() {
		if (!this._element) {
			this._element = this.render();
			this.bind();
		}
		return this._element;
	}

	/**
	 * show greetings page when back button clicked
	 */
	goToPrevPage() {
		app.showGreeting();
	}
}
