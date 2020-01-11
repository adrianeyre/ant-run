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
		this.sprites = [];
		this.level = 1;
		this.isGameInPlay = false;
		this.iteration = 0;
		this.timerInterval = this.DEFAULT_TIMER_INTERVAL;

		this.reset();
	}

	public handleInput = (playerResult: PlayerResultEnum, sprite?: ISprite): void => {
		switch (playerResult) {
			case PlayerResultEnum.SAFE:
				break;
			case PlayerResultEnum.MOVE:
				this.moveBlock(sprite); break;
			case PlayerResultEnum.DEAD:
				this.looseLife(); break;
		}
	}

	public handleTimer = (): void => {
		// this.iteration ++;
		// this.time.show(this.iteration, this.sprites);
		this.handleInput(this.player.move(this.sprites, 3, 3));
	}

	private moveBlock = (sprite?: ISprite): void | null => sprite ? sprite.move() : null

	private reset = (): void => {
		this.sprites = this.board.setBoard([]);
		this.time.setTime(this.sprites);
		this.player.setStart(this.sprites);
	}

	private looseLife = () => {
		this.player.looseLife();
		this.reset();
		
		if (!this.player.isAlive) this.isGameInPlay = false;
	}
}
