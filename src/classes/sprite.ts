import ISpriteProps from './interfaces/sprite-props';
import ISprite from './interfaces/sprite';
import DirectionEnum from './enums/direction-enum';
import SpriteTypeEnum from './enums/sprite-type-enum';
import ImageEnum from './enums/image-enum';

import block0 from '../images/block0.png';
import block1 from '../images/block1.png';
import block2 from '../images/block2.png';
import block3 from '../images/block3.png';
import block4 from '../images/block4.png';
import block5 from '../images/block5.png';
import block6 from '../images/block6.png';
import block7 from '../images/block7.png';
import block8 from '../images/block8.png';
import block9 from '../images/block9.png';
import block10 from '../images/block10.png';
import block11 from '../images/block11.png';
import block12 from '../images/block12.png';
import block13 from '../images/block13.png';
import time from '../images/time.png';

export default class Sprite implements ISprite {
	public key: string;
	public visable: boolean;
	public x: number;
	public y: number;
	public width: number;
	public height: number;
	public zIndex: number;
	public direction: DirectionEnum;
	public image: string;
	public type: SpriteTypeEnum;

	private imageType: ImageEnum;

	readonly Z_INDEX: number = 5000;
	readonly playerImages = {
		block: [block0, block0, block0, block0],
		cross: [block1, block1, block1, block1],
		corner: [block2, block3, block4, block5],
		straight: [block6, block7, block6, block7],
		start: [block8, block9, block10, block11],
		bonus: [block12, block13, block12, block13],
		time: [time, time, time, time],
	}

	constructor(config: ISpriteProps) {
		this.imageType = config.image;
		this.key = config.key;
		this.visable = config.visable;
		this.x = config.x;
		this.y = config.y;
		this.width = config.width;
		this.height = config.height;
		this.zIndex = this.Z_INDEX;
		this.direction = config.direction;
		this.image = ''
		this.type = config.type;

		this.setImage();
	}

	public move = (): void => {
		if (!this.visable) return;

		switch (this.direction) {
			case DirectionEnum.UP:
				this.direction = DirectionEnum.RIGHT; break;
			case DirectionEnum.RIGHT:
				this.direction = DirectionEnum.DOWN; break;
			case DirectionEnum.DOWN:
				this.direction = DirectionEnum.LEFT; break;
			case DirectionEnum.LEFT:
				this.direction = DirectionEnum.UP; break;
		}

		this.setImage();
	}

	public setType = (type: ImageEnum): ImageEnum => this.imageType = type;
	public setImage = (): string => this.image = this.playerImages[this.imageType][this.direction];
}
