import IPlayer from './player';
import ISprite from './sprite';
import PlayerResultEnum from '../enums/player-result-enum';

export default interface IGame {
	player: IPlayer;
	sprites?: ISprite[];
	level: number;
	timer: any;
	iteration: number;
	isGameInPlay: boolean;
	timerInterval: number;
	handleInput(playerResult: PlayerResultEnum): void;
	handleTimer(): void;
}
