/* functionality */
import app from '../../utils/app';

/* content */
import AbstractView from '../abstract-view';
import header from '../../utils/header';

/* data */
import {initialData} from '../../data/data';

/**
 * Rules page view, #rules
 */
export default class RulesView extends AbstractView {

	constructor() {
		super();
	}

	get template() {
		return `<header class="header">

			${header()}

		</header>
		<div class="rules">
		    <h1 class="rules__title">Детали</h1>
		    <p class="rules__description">Дай 10 правильных ответов. <br>
			На один вопрос - 30 секунд.<br>
			Максимум 3 провала<br><br>
			Правда <img src="img/icon-true.png" class="img-rules" alt="">,  Вымысел <img src="img/icon-false.png" class="img-rules" alt=""><br><br>
		    </p>
		    <form class="rules__form">
				<input class="rules__input" type="text" placeholder="Твое имя">
				<button class="rules__button  continue" type="submit" disabled>Go!</button>
		    </form>
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
		 * go to the next page
		 */
		const nextPageButton = this.element.querySelector('.rules__button');
		nextPageButton.onclick = (e) => {
			e.preventDefault();
			this.goToNextPage();
		};

		/**
		 * check for non-empty input
		 */
		this._input = this.element.querySelector('.rules__input');
		this._input.onkeyup = () => {
			if (this._input.value) {
				nextPageButton.disabled = false;
			} else {
				nextPageButton.disabled = true;
			}
		};
	}

	goToNextPage() {
		this._state = JSON.parse(JSON.stringify(initialData));
		this._state.name = this._input.value;
		app.showGame(this._state);
	}

	init() {
		this.renderPage(this.element);
	}
}
