import IPlayer from './player';
import ISprite from './sprite';
import IBoard from './board';
import ITime from './time';
import PlayerResultEnum from '../enums/player-result-enum';

export default interface IGame {
	player: IPlayer;
	sprites?: ISprite[];
	board: IBoard;
	time: ITime;
	level: number;
	timer: any;
	iteration: number;
	isGameInPlay: boolean;
	timerInterval: number;
	handleInput(playerResult: PlayerResultEnum, sprite?: ISprite): void;
	handleTimer(): void;
}
