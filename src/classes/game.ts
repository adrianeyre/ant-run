import Player from './player';
import Board from './board';
import Time from './time';
import IGame from './interfaces/game';
import IPlayer from './interfaces/player';
import ISprite from './interfaces/sprite';
import ITime from './interfaces/time';
import IBoard from './interfaces/board';
import PlayerResultEnum from './enums/player-result-enum';
import IAntRunProps from '../components/ant-run/interfaces/ant-run-props';

export default class Game implements IGame {
	public player: IPlayer;
	public sprites: ISprite[];
	public board: IBoard;
	public time: ITime;
	public level: number;
	public timer: any;
	public iteration: number;
	public isGameInPlay: boolean;
	public timerInterval: number;

	readonly DEFAULT_TIMER_INTERVAL: number = 1000;
	
	readonly MAX_TIME: number = 30;
	
	constructor(config: IAntRunProps) {
		this.player = new Player(config);
		this.board = new Board();
		this.time = new Time();
		this.sprites = this.board.setBoard([]);
		this.level = 1;
		this.isGameInPlay = false;
		this.iteration = 1;
		this.timerInterval = this.DEFAULT_TIMER_INTERVAL;

		this.time.setTime(this.sprites);
	}

	public handleInput = (playerResult: PlayerResultEnum, sprite?: ISprite): void => {
		switch (playerResult) {
			case PlayerResultEnum.NO_MOVE:
				return;
			case PlayerResultEnum.MOVE:
				this.moveBlock(sprite); break;
		}
	}

	public handleTimer = (): void => {
		
	}

	private moveBlock = (sprite?: ISprite): void | null => sprite ? sprite.move() : null
}
