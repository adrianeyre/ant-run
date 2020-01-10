import DirectionEnum from '../enums/direction-enum';
import PlayerResultEnum from '../enums/player-result-enum';

export default interface IPlayer {
	key: string;
	visable: boolean;
	x: number;
	y: number;
	width: number;
	height: number;
	initialPlayerX: number;
	initialPlayerY: number;
	zIndex: number
	direction: DirectionEnum;
	score: number;
	lives: number;
	image: string;
	isAlive: boolean;
	move(direction: DirectionEnum, spriteBlocksWidth: number): PlayerResultEnum;
}
