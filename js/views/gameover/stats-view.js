/* functionality */
import {fillStats, mistakes, mathPoints} from '../../utils/game';
import app from '../../utils/app';
import {levels, initialData} from '../../data/data';

/* content */
import AbstractView from '../abstract-view';
import header from '../../utils/header';


/**
 * Statistic page view, #stats
 */
export default class StatsView extends AbstractView {

	constructor(state = initialData) {
		super();
		this.state = state;

		/**
		 * systematize ans math all stats and points
		 */
		this._stats = mathPoints(this.state);

		/**
		 * Load list of mistakes if exists
		 */
		this._mistakesList = mistakes.length ? `
			<h1>Ошибки: </h1>
			${mistakes.map((fact) => {
				return `<sup>*</sup> ${fact}<br>`
			}).join('')}` : ``;
	}

	get template() {
		return `
			<header class="header">
				${header()}

			</header>
			<div class="result">
			<h1>Итак, ${this.state.name}, твой результат:</h1>
				<table class="result__table">
					<tr>
						<td colspan="2">
							<ul class="stats">

								${fillStats(this.state)}

							</ul>
						</td>
						<td class="result__points">×&nbsp;100</td>
						<td class="result__total">${this._stats.correctPoints}</td>
					</tr>
					<tr>
						<td></td>
						<td class="result__extra">Бонус за скорость:</td>
						<td class="result__extra"> ${this._stats.fast} &nbsp;<span class="stats__result stats__result--fast"></span></td>
						<td class="result__points">×&nbsp;50</td>
						<td class="result__total">${this._stats.fastPoints}</td>
					</tr>
					<tr>
						<td></td>
						<td class="result__extra">Бонус за жизни:</td>
						<td class="result__extra">${this.state.lives}&nbsp;<span class="stats__result stats__result--heart"></span></td>
						<td class="result__points">×&nbsp;50</td>
						<td class="result__total">${this._stats.livesPoints}</td>
					</tr>
					<tr>
						<td></td>
						<td class="result__extra">Штраф за медлительность:</td>
						<td class="result__extra">${this._stats.slow}&nbsp;<span class="stats__result stats__result--slow"></span></td>
						<td class="result__points">×&nbsp;-50</td>
						<td class="result__total">${this._stats.slowPoints}</td>
					</tr>
					<tr>
						<td colspan="5" class="result__total  result__total--final">${this._stats.totalPoints}</td>
					</tr>
				</table>
				${this._mistakesList}
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
	}

	init() {
		this.renderPage(this.element);
	}
}
