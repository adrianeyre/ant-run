import ISprite from './sprite';

export default interface IBoard {
	startX: number;
	startY: number;
	setBoard(sprites: ISprite[]): ISprite[];
}
