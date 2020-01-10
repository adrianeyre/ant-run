import ISpriteProps from './interfaces/sprite-props';
import ISprite from './interfaces/sprite';
import DirectionEnum from './enums/direction-enum';
import PlayerResultEnum from './enums/player-result-enum';
import SpriteTypeEnum from './enums/sprite-type-enum';
import ImageEnum from './enums/image-enum';

import block8 from '../images/block8.png';
import block9 from '../images/block9.png';
import block10 from '../images/block10.png';
import block11 from '../images/block11.png';

export default class Sprite implements ISprite {
	public key: string;
	public visable: boolean;
	public x: number;
	public y: number;
	public width: number;
	public height: number;
	public zIndex: number;
	public direction: DirectionEnum | undefined;
	public image: ImageEnum;
	public type: SpriteTypeEnum;

	private imageType: string;

	readonly Z_INDEX: number = 5000;
	readonly playerImages = {
		start: [
			block8,
			block10,
			block11,
			block9,
		],
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
		this.direction = config.direction ? config.direction : undefined;
		this.image = this.playerImages[this.imageType][this.direction];
		this.type = config.type;
	}

	public move = (): PlayerResultEnum => {
		return PlayerResultEnum.NO_MOVE;
	}
}
