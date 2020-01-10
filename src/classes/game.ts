import IGame from './interfaces/game';
import Player from './player';
import IPlayer from './interfaces/player';
import ISprite from './interfaces/sprite';
import PlayerResultEnum from './enums/player-result-enum';
import IAntRunProps from '../components/ant-run/interfaces/ant-run-props';


export default class Game implements IGame {
	public player: IPlayer;
	public sprites: ISprite[];
	public level: number;
	public timer: any;
	public iteration: number;
	public isGameInPlay: boolean;
	public timerInterval: number;

	readonly DEFAULT_TIMER_INTERVAL: number = 1000;
	readonly SPRITE_BLOCKS_WIDTH: number = 143;
	readonly SPRITE_BLOCKS_HEIGHT: number = 96;
	
	constructor(config: IAntRunProps) {
		this.player = new Player(config);
		this.sprites = []
		this.level = 1;
		this.isGameInPlay = false;
		this.iteration = 1;
		this.timerInterval = this.DEFAULT_TIMER_INTERVAL;
	}

	public handleInput = (playerResult: PlayerResultEnum, sprite?: ISprite): void => {
		switch (playerResult) {
			case PlayerResultEnum.NO_MOVE:
				return;
		}
	}

	public handleTimer = (): void => {
		
	}
}
