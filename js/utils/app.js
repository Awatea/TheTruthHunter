/* content */
import IntroView from '../views/welcome/intro-view';
import GreetingView from '../views/welcome/greeting-view';
import RulesView from '../views/welcome/rules-view';
import GameView from '../views/game/gameView';
import StatsView from '../views/gameover/stats-view';

/* data */
import {initialData} from '../data/data';


const ControllerID = {
	INTRO: '',
	GREETING: 'greeting',
	RULES: 'rules',
	GAME: 'game',
	STATS: 'stats'
};

const replaceHash = (hash) => { return hash.replace(`#`, ``); };

/**
* Router
*/
class App {
	constructor() {
		this.routes = {
			[ControllerID.INTRO]: IntroView,
			[ControllerID.GREETING]: GreetingView,
			[ControllerID.RULES]: RulesView,
			[ControllerID.GAME]: GameView,
			[ControllerID.STATS]: StatsView
		};
		window.onhashchange = () => {
			this.changeController(replaceHash(location.hash));
		};
	}

	changeController(route = ControllerID.INTRO) {
		const Controller = this.routes[route];
		if (route != ControllerID.STATS && route != ControllerID.GAME) {
			new Controller().init();
		} else {
			new Controller(this._state).init();
		}
	}

	showIntro() {
		location.hash = ControllerID.INTRO;
	}

	showGreeting() {
		location.hash = ControllerID.GREETING;
	}

	showRules() {
		location.hash = ControllerID.RULES;
	}

	showGame(state) {
		this._state = state;
		location.hash = ControllerID.GAME;
	}

	showStats(state) {
		this._state = state;
		location.hash = ControllerID.STATS;
	}

	init() {
		this.changeController(replaceHash(location.hash));
	}

}

const app = new App();
app.init();

export default app;
