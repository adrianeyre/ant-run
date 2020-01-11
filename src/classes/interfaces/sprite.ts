import DirectionEnum from '../enums/direction-enum';
import SpriteTypeEnum from '../enums/sprite-type-enum';

export default interface ISprite {
	key: string;
	visable: boolean;
	x: number;
	y: number;
	width: number;
	height: number;
	zIndex: number
	direction: DirectionEnum;
	image: string;
	type: SpriteTypeEnum;
	move(): void
}
