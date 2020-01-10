import IPlayerProps from './interfaces/player-props';

import IPlayer from './interfaces/player';
import DirectionEnum from './enums/direction-enum';
import PlayerResultEnum from './enums/player-result-enum';

import playerUp from '../images/ant-up1.png';
import playerDown from '../images/ant-down1.png';
import playerLeft from '../images/ant-left1.png';
import playerRight from '../images/ant-right1.png';

export default class Player implements IPlayer {
	public key: string;
	public visable: boolean;
	public x: number;
	public y: number;
	public width: number;
	public height: number;
	public initialPlayerX: number;
	public initialPlayerY: number;
	public zIndex: number
	public direction: DirectionEnum;
	public score: number;
	public lives: number;
	public image: string;
	public isAlive: boolean;

	readonly INITIAL_PLAYER_LIVES: number = 3;
	readonly INITIAL_PLAYER_X: number = 50;
	readonly INITIAL_PLAYER_Y: number = 50;
	readonly PLAYER_WIDTH: number = 3;
	readonly PLATER_HEIGHT: number = 3;
	readonly PLAYER_ZINDEX: number = 6000;
	readonly playerImages: string[] = [
		playerUp,
		playerDown,
		playerLeft,
		playerRight,
	];

	constructor(config: IPlayerProps) {
		this.key = 'player';
		this.visable = true;
		this.initialPlayerX = config.initialPlayerX || this.INITIAL_PLAYER_X;
		this.initialPlayerY = config.initialPlayerY || this.INITIAL_PLAYER_Y;
		this.x = this.initialPlayerX;
		this.y = this.initialPlayerY;
		this.width = this.PLAYER_WIDTH;
		this.height = this.PLATER_HEIGHT;
		this.zIndex = this.PLAYER_ZINDEX;
		this.direction = DirectionEnum.RIGHT;
		this.score = 0;
		this.lives = config.initialPlayerLives || this.INITIAL_PLAYER_LIVES;
		this.image = this.playerImages[this.direction];
		this.isAlive = true;
	}

	public move = (direction: DirectionEnum, spriteBlocksWidth: number): PlayerResultEnum => {
		return PlayerResultEnum.NO_MOVE;
	}
}
