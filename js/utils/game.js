/**
 * check and save mistakes
 */
 export let mistakes = [];
function saveMistake(level, answer1, answer2, fact3) {
	if (level.type == `game1`) {

		if (answer1 != level.options[0].answer) {
			mistakes.push(level.options[0].fact);

		} else if (answer2 != level.options[1].answer) {
			mistakes.push(level.options[1].fact);

		}
	} else if (level.type == `game2`) {

		if (answer1 != level.options[0].answer) {
			mistakes.push(level.options[0].fact);
		}
	} else {
		if (fact3) {
			mistakes.push(fact3);
		}
	}
}

/**
 * check if player's answer is correct
 */
export function checkResult(level, chosen1, chosen2) {

	let result = false;

	if (level.type == `game1`) {
		if (level.options[0].answer == chosen1 && level.options[1].answer == chosen2) {

			result = true;

		} else if (level.options[0].answer != chosen1 || level.options[1].answer != chosen2) {

			saveMistake(level, chosen1, chosen2);
		}

	} else if (level.type == `game2`) {
		if (level.options[0].answer == chosen1) {

			result = true;

		} else if (level.options[0].answer != chosen1) {

			saveMistake(level, chosen1);

		}

	} else if (level.type == `game3`) {

		for (let i = 0; i < level.options.length; i++) {
			if (level.options[i].fact == chosen1 && level.options[i].answer == `true`) {

				result = true;

			} else if (level.options[i].fact == chosen1 && level.options[i].answer != `true`) {

				saveMistake(level, null, null, level.options[i].fact);

			}
		}

	}
	return result;
}

/**
 * check how fast did player answer
 */
export function getResultTime(result, currentState, timer) {
	const newState = Object.assign({}, currentState);
	/**
	 * if answer is correct
	 */
	if (result) {

		if (timer > 20) {
			newState.stats.push('fast');
		} else if (timer > 10) {
			newState.stats.push('correct');
		} else if (timer > 0){
			newState.stats.push('slow');
		}

	/**
	 * if answer is wrong - save mistake and loose 1 life
	 */
	} else {

		newState.lives--;
		newState.stats.push('wrong');

	}
	return newState;
}

/**
 * prepare html-markup for stats
 */
const getStatTags = (state) => {
	const result = [];
	for (let i = 0; i < state.stats.length; i++) {
		if (state.stats[i] == 'wrong') {
			result.push('<li class="stats__result stats__result--wrong"></li>');
		} else if (state.stats[i] == 'slow') {
			result.push('<li class="stats__result stats__result--slow"></li>');
		} else if (state.stats[i] == 'fast') {
			result.push('<li class="stats__result stats__result--fast"></li>');
		} else if (state.stats[i] == 'correct') {
			result.push('<li class="stats__result stats__result--correct"></li>');
		}
	}
	return result.join('');
};

/**
 * fill stats with html-markup
 */
export function fillStats (state) {
	if (state.stats) {
		return `
			${getStatTags(state)}

			${new Array(10 - state.stats.length)
			.fill(`<li class="stats__result stats__result--unknown"></li>`)
			.join('')
		}`;
	} else {
		throw new Error('Incorrect state received');
	}
}

/**
 * return list of questions and answers for current level
 */
export function loadQuestions(level) {
	if (level.options) {
		let questions = ``;
		if (level.type == `game1` || level.type == `game2`) {
			for (let i = 0; i < level.options.length; i++) {
				const newQuestion = `
					<div class="game__option">

						<div class="game__fact" width="468" height="458">${level.options[i].fact}</div>
						<label class="game__answer game__answer--true">
							<input name="question${i+1}" type="radio" value="true">
							<span>Правда</span>
						</label>
						<label class="game__answer game__answer--false">
							<input name="question${i+1}" type="radio" value="false">
							<span>Вымысел</span>
						</label>

					</div>
				`;
				questions += newQuestion;
			}
		} else if (level.type == `game3`) {

			for (let j = 0; j < level.options.length; j++) {
				const newQuestion = `
					<div class="game__option">

						<div class="game__fact">${level.options[j].fact}</div>

					</div>
				`;
				questions += newQuestion;
			}
		}

		return questions;
	} else {
		throw new Error(`Incorrect state received`);
	}
}

/**
 * Math stats points for statistic page view
 */
export function mathPoints(state = initialData) {
	/**
	 * systematize and math all stats and points
	 */
	if (state) {
		const statistic = {};
		statistic.slow = 0;
		statistic.fast = 0;
		statistic.correct = 0;

		for (let i = 0; i < state.stats.length; i++) {
			if (state.stats[i] == 'slow') {
				statistic.slow++;
			} else if (state.stats[i] == 'fast') {
				statistic.fast++;
			} else if (state.stats[i] == 'correct') {
				statistic.correct++;
			}
		};
		statistic.slowPoints = statistic.slow * -50;
		statistic.fastPoints = statistic.fast * 50;
		statistic.correctPoints = (statistic.correct + statistic.fast + statistic.slow) * 100;
		statistic.livesPoints = state.lives * 50;

		statistic.totalPoints = statistic.correctPoints +
		statistic.fastPoints +
		statistic.slowPoints +
		statistic.livesPoints;

		return statistic;
	}
}
