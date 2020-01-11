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

	readonly DEFAULT_TIMER_INTERVAL: number = 800;
	readonly DEFAULT_TIMER_DECREMENT: number = 50;
	readonly DEFAULT_TIMER_MIN: number = 50;
	
	readonly MAX_BLOCKS: number = 30;
	
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
				this.playerSafe(); break;
			case PlayerResultEnum.MOVE:
				this.moveBlock(sprite); break;
			case PlayerResultEnum.DEAD:
				this.looseLife(); break;
			case PlayerResultEnum.NEW_BLOCK:
				this.updateTime(); break;
			case PlayerResultEnum.BONUS_BLOCK:
				this.playerBonus(); this.updateTime(); break;
		}
	}

	public handleTimer = (): void => {
		if (this.player.onBoard) {
			this.handleInput(this.player.move(this.sprites, 3, 3));
		} else {
			this.player.moveIntro(this.sprites);
		}
	}

	private updateTime = (): void => {
		this.iteration ++;
		this.time.show(this.iteration, this.sprites);

		if (this.iteration >= this.MAX_BLOCKS) this.nextLevel();
	}

	private moveBlock = (sprite?: ISprite): void | null => sprite ? sprite.move(this.player.x, this.player.y) : null

	private reset = (): void => {
		this.iteration = 0;
		this.sprites = this.board.setBoard([]);
		this.time.setTime(this.sprites);
		this.player.resetInto();
	}

	private playerSafe = (): number => this.player.spaceMovedScore();

	private looseLife = (): void => {
		this.player.looseLife();
		this.reset();
		
		if (!this.player.isAlive) this.isGameInPlay = false;
	}

	private nextLevel = (): void => {
		this.level ++;
		this.timerInterval -= this.DEFAULT_TIMER_DECREMENT;
		if (this.timerInterval < this.DEFAULT_TIMER_MIN) this.timerInterval = this.DEFAULT_TIMER_MIN;
		this.player.nextLevelScore();
		this.reset();
	}

	private playerBonus = (): number => this.player.playerBonus();
}
