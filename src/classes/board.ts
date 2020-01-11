import IBoard from './interfaces/board';
import ISprite from './interfaces/sprite';
import SpriteTypeEnum from './enums/sprite-type-enum';
import DirectEnum from './enums/direction-enum';
import ImageEnum from './enums/image-enum';
import Sprite from './sprite';

export default class Board implements IBoard {
	public startX: number;
	public startY: number;

	constructor() {
		this.startX = 0;
		this.startY = 0;
	}

	readonly SPRITE_BLOCKS_WIDTH: number = 8;
	readonly SPRITE_BLOCKS_HEIGHT: number = 6;
	readonly X_OFFSET: number = 7;
	readonly Y_OFFSET: number = 4;

	readonly directions = [DirectEnum.UP, DirectEnum.RIGHT, DirectEnum.DOWN, DirectEnum.LEFT];
	readonly images = [ImageEnum.CROSS, ImageEnum.CORNER, ImageEnum.STRAIGHT];

	public setBoard = (sprites: ISprite[]): ISprite[] => {
		sprites = [];

		for(let y = 1; y <= this.SPRITE_BLOCKS_HEIGHT; y++) {
			for(let x = 1; x <= this.SPRITE_BLOCKS_WIDTH; x++) {
				sprites.push(this.newBlock(x, y));
			}
		}

		this.setStart(sprites);
		this.setBonus(sprites);

		return sprites;
	}

	private setStart = (sprites: ISprite[]): void => {
		this.startX = this.xVal();
		this.startY = this.yVal();
		const sprite = sprites.find((spr: ISprite) => spr.key === `sprite-${ this.startX }-${ this.startY }`);

		if (!sprite) throw new Error('Start sprite not found!');
		sprite.setType(SpriteTypeEnum.START);
		sprite.setImageType(ImageEnum.START);
		sprite.setPath();
		sprite.setImage();
	}

	private setBonus = (sprites: ISprite[]): void => {
		const x = this.xVal();
		const y = this.yVal();
		const sprite = sprites.find((spr: ISprite) => spr.key === `sprite-${ x }-${ y }` && spr.type !== SpriteTypeEnum.START);

		if (!sprite) return;
		sprite.setType(SpriteTypeEnum.BONUS);
		sprite.setImageType(ImageEnum.BONUS);
		sprite.setPath();
		sprite.setImage();
	}

	private newBlock = (x: number, y: number): ISprite => new Sprite({
		key: `sprite-${ x }-${ y }`,
		visable: true,
		x: x * 3 + this.X_OFFSET,
		y: y * 3 + this.Y_OFFSET,
		width: 3,
		height: 3,
		direction: this.randomDirection(),
		image: this.randomImage(),
		type: SpriteTypeEnum.BLOCK,
	});

	private randomDirection = (): DirectEnum => this.directions[Math.floor(Math.random() * this.directions.length)];
	private randomImage = (): ImageEnum => this.images[Math.floor(Math.random() * this.images.length)];
	private xVal = (): number => Math.floor(Math.random() * this.SPRITE_BLOCKS_WIDTH) + 1;
	private yVal = (): number => Math.floor(Math.random() * this.SPRITE_BLOCKS_HEIGHT) + 1;
}