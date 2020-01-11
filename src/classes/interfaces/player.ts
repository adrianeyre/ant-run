import DirectionEnum from '../enums/direction-enum';
import PlayerResultEnum from '../enums/player-result-enum';
import ISprite from './sprite';

export default interface IPlayer {
	key: string;
	visable: boolean;
	x: number;
	y: number;
	blockX: number;
	blockY: number
	width: number;
	height: number;
	iteration: number;
	zIndex: number
	direction: DirectionEnum;
	score: number;
	lives: number;
	image: string;
	isAlive: boolean;
	onBoard: boolean;
	looseLife(): void;
	move(sprites: ISprite[], blockWidth: number, blockHeight: number): PlayerResultEnum;
	setStart(sprites: ISprite[]): void;
}
