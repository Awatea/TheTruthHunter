import assert from 'assert';
import * as game from './game';

/**
 * test levels
 */
const levels = [{
	'type': `game1`,
	'options': [{
		'fact': `bla one`,
		'answer': `true`
	}, {
		'fact': `bla two`,
		'answer': `false`
	}]
}, {
	'type': `game2`,
	'options': [{
		'fact': `bla three`,
		'answer': `true`
	}]
}, {
	'type': `game3`,
	'options': [{
		'fact': `bla four`,
		'answer': `false`
	}, {
		'fact': `bla five`,
		'answer': `false`
	}, {
		'fact': `bla six`,
		'answer': `true`
	}]
}];

/**
 * test data
 */
const data = {
	"lives": 3,
	"stats": ['slow'],
	"currentLevel": 0
};


describe(`Game functionality`, () => {

	describe(`Loading questions`, () => {
	    it(`should return only text`, () => {
			assert(typeof game.loadQuestions(levels[1]) === 'string');
		});

		it('should break when takes incorrect data', () => {
			assert.throws(() => game.loadQuestions('blabla'), /Incorrect state received/);
		});
	});

	describe(`Filling statistic's sequence`, () => {
	    it(`should return only text`, () => {
			assert(typeof game.fillStats(data) === 'string');
		});
		it('should break when takes incorrect data', () => {
			assert.throws(() => game.fillStats('blabla'), /Incorrect state received/);
		});
	});

	describe(`Checking results`, () => {
	    it(`should return true 1`, () => {
			assert(game.checkResult(levels[0], 'true', 'false'));
		});
	    it(`should return true 2`, () => {
			assert(game.checkResult(levels[1], 'true'));
		});
	    it(`should return true 3`, () => {
			assert(game.checkResult(levels[2], 'bla six'));
		});
	    it(`should remove 1 life`, () => {
			const newState = game.getResultTime(false, data, 10);
			assert.equal(newState.lives, 2);
		});
	    it(`should remove 2 lives`, () => {
			const newState = game.getResultTime(false, data, 10);
			const newState2 = game.getResultTime(false, newState, 10);
			assert.equal(newState2.lives, 1);
		});
	});

});
