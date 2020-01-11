import ITime from './interfaces/time';
import ISprite from './interfaces/sprite';
import SpriteTypeEnum from './enums/sprite-type-enum';
import DirectEnum from './enums/direction-enum';
import ImageEnum from './enums/image-enum';
import PlayerResultEnum from './enums/player-result-enum';
import Sprite from './sprite';

export default class Time implements ITime {
	readonly MAX_TIME: number = 30;
	readonly X_OFFSET: number = 37

	public setTime = (sprites: ISprite[]): void => {
		for(let y = 1; y <= this.MAX_TIME; y++) {
			sprites.push(this.newTime(this.X_OFFSET, y));
		}
	}

	public show = (key: number, sprites: ISprite[]): PlayerResultEnum => {
		if (key > this.MAX_TIME) return PlayerResultEnum.TIME_OVER;

		const y = this.MAX_TIME - key + 1;
		const sprite = sprites.find((spr: ISprite) => spr.key === `time-${ y }`);
		if (!sprite) throw new Error('Cannot find time sprite!');

		sprite.visable = true;
		return PlayerResultEnum.SAFE;
	}

	private newTime = (x: number, y: number): ISprite => new Sprite({
		key: `time-${ y }`,
		visable: false,
		x,
		y: y * 0.5 + 6,
		width: 2,
		height: 0.5,
		direction: DirectEnum.RIGHT,
		image: ImageEnum.TIME,
		type: SpriteTypeEnum.TIME,
	});
}