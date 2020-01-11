import IPlayerProps from './interfaces/player-props';

import IPlayer from './interfaces/player';
import ISprite from './interfaces/sprite';
import DirectionEnum from './enums/direction-enum';
import PlayerResultEnum from './enums/player-result-enum';
import DirectEnum from './enums/direction-enum';

import playerUp1 from '../images/ant-up1.png';
import playerUp2 from '../images/ant-up2.png';
import playerDown1 from '../images/ant-down1.png';
import playerDown2 from '../images/ant-down2.png';
import playerLeft1 from '../images/ant-left1.png';
import playerLeft2 from '../images/ant-left2.png';
import playerRight1 from '../images/ant-right1.png';
import playerRight2 from '../images/ant-right2.png';

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
	public onBoard: boolean;

	private iteration: boolean;

	readonly INITIAL_PLAYER_LIVES: number = 3;
	readonly INITIAL_PLAYER_X: number = 18;
	readonly INITIAL_PLAYER_Y: number = 3;
	readonly PLAYER_WIDTH: number = 1;
	readonly PLATER_HEIGHT: number = 1;
	readonly PLAYER_ZINDEX: number = 6000;
	readonly playerImages: string[][] = [
		[playerUp1, playerUp2],
		[playerRight1, playerRight2],
		[playerDown1, playerDown2],
		[playerLeft1, playerLeft2],
	];

	constructor(config: IPlayerProps) {
		this.key = 'player';
		this.visable = true;
		this.iteration = false;
		this.onBoard = false;
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
		this.image = ''
		this.isAlive = true;

		this.setImage();
	}

	public move = (sprites: ISprite[]): PlayerResultEnum => {
		let x = this.x;
		let y = this.y;

		switch (this.direction) {
			case DirectEnum.RIGHT:
				x++; break;
		}

		this.x = x;
		this.y = y;
		this.iteration = !this.iteration;
		this.setImage();

		return PlayerResultEnum.SAFE;
	}

	private setImage = (): string => this.image = this.playerImages[this.direction][this.iteration ? 0 : 1];
}
