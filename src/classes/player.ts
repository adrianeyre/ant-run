import IPlayerProps from './interfaces/player-props';

import IPlayer from './interfaces/player';
import ISprite from './interfaces/sprite';
import DirectionEnum from './enums/direction-enum';
import PlayerResultEnum from './enums/player-result-enum';
import DirectEnum from './enums/direction-enum';
import SpriteTypeEnum from './enums/sprite-type-enum';

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
	public blockX: number;
	public blockY: number
	public width: number;
	public height: number;
	public iteration: number;
	public zIndex: number
	public direction: DirectionEnum;
	public score: number;
	public lives: number;
	public image: string;
	public isAlive: boolean;
	public onBoard: boolean;

	private imageIteration: boolean;

	readonly SPACE_MOVED_SCORE: number = 5;
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
		this.imageIteration = false;
		this.onBoard = false;
		this.iteration = 0;
		this.x = this.INITIAL_PLAYER_X;
		this.y = this.INITIAL_PLAYER_Y;
		this.blockX = 0;
		this.blockY = 0;
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

	public setStart = (sprites: ISprite[]): void => {
		const sprite = sprites.find((spr: ISprite) => spr.type === SpriteTypeEnum.START);
		if (!sprite) throw new Error('Start block not found!');

		this.setPlace(sprite);
	}

	public spaceMovedScore = (): number => this.score += this.SPACE_MOVED_SCORE;

	public looseLife = (): void => {
		this.lives --;
		if (this.lives < 1) this.isAlive = false;
	}

	public move = (sprites: ISprite[], blockWidth: number, blockHeight: number): PlayerResultEnum => {
		let x = this.x,
			y = this.y,
			blockX = this.blockX,
			blockY = this.blockY;

		switch (this.direction) {
			case DirectEnum.UP:
				y--; blockY--; break;
			case DirectEnum.RIGHT:
				x++; blockX++; break;
			case DirectEnum.DOWN:
				y++; blockY++; break;
			case DirectEnum.LEFT:
				x--; blockX--; break;
		}

		if (blockX < 0) blockX = 2;
		if (blockX > 2) blockX = 0;
		if (blockY < 0) blockY = 2;
		if (blockY > 2) blockY = 0;

		const sprite = this.findSprite(sprites, blockWidth, blockHeight, x, y);
		if (!sprite) {
			this.goDownHole();
			return PlayerResultEnum.SAFE;
		}

		const path = sprite.paths[sprite.direction];
		if (path[blockY][blockX] === 0 && this.blockX === 1 && this.blockY === 1) {
			return this.updateDirection(path, sprites, blockWidth, blockHeight);
		}

		if (path[blockY][blockX] === 0) {
			return PlayerResultEnum.DEAD;
		}

		this.x = x;
		this.y = y;
		this.blockX = blockX;
		this.blockY = blockY;
		this.imageIteration = !this.imageIteration;
		this.setImage();

		return PlayerResultEnum.SAFE;
	}

	private updateDirection = (path: number[][], sprites: ISprite[], blockWidth: number, blockHeight: number): PlayerResultEnum => {
		const newDirection = this.changeDirection(path);
		if (newDirection === DirectionEnum.DEAD) return PlayerResultEnum.DEAD;

		this.direction = newDirection;
		this.setImage();
		this.move(sprites, blockWidth, blockHeight);

		return PlayerResultEnum.SAFE;
	}

	private goDownHole = () => {
		switch (this.direction) {
			case DirectionEnum.UP:
				this.y = 24;
				this.blockY = 2;
				break;
			case DirectionEnum.RIGHT:
				this.x = 10;
				this.blockX = 0;
				break;
			case DirectionEnum.DOWN:
				this.y = 7;
				this.blockY = 0;
				break;
			case DirectionEnum.LEFT:
				this.x = 33;
				this.blockX = 2;
				break;
		}
	}

	private findSprite = (sprites: ISprite[], blockWidth: number, blockHeight: number, x: number, y: number): ISprite | undefined =>
		sprites.find((spr: ISprite) =>
			x >= spr.x &&
			x < spr.x + blockWidth &&
			y >= spr.y &&
			y < spr.y + blockHeight
		)

	private setPlace = (sprite: ISprite): void => {
		const path = sprite.paths[sprite.direction];
		this.x = sprite.x + 1
		this.y = sprite.y + 1
		this.blockX = 1;
		this.blockY = 1;
		this.direction = sprite.direction;
		this.setImage();

		this.addItteration(path.length);
	}

	private addItteration = (max: number) => {
		this.iteration ++;

		if (this.iteration >= max) this.iteration = 0;
	}

	private changeDirection = (path: number[][]): DirectionEnum => {
		switch (this.direction) {
			case DirectionEnum.UP:
				if (this.tryRight(path)) return DirectionEnum.RIGHT;
				if (this.tryLeft(path)) return DirectionEnum.LEFT;
				break;
			case DirectionEnum.RIGHT:
				if (this.tryUp(path)) return DirectionEnum.UP;
				if (this.tryDown(path)) return DirectionEnum.DOWN;
				break;
			case DirectionEnum.DOWN:
				if (this.tryLeft(path)) return DirectionEnum.LEFT;
				if (this.tryRight(path)) return DirectionEnum.RIGHT;
				break;
			case DirectionEnum.LEFT:
				if (this.tryDown(path)) return DirectionEnum.DOWN;
				if (this.tryUp(path)) return DirectionEnum.UP;
				break;
		}

		return DirectionEnum.DEAD;
	}

	private tryUp = (path: number[][]) => path[this.blockY - 1][this.blockX] === 1;
	private tryDown = (path: number[][]) => path[this.blockY + 1][this.blockX] === 1;
	private tryRight = (path: number[][]) => path[this.blockY][this.blockX + 1] === 1;
	private tryLeft = (path: number[][]) => path[this.blockY][this.blockX - 1] === 1;

	private setImage = (): string => this.image = this.playerImages[this.direction][this.imageIteration ? 0 : 1];
}
