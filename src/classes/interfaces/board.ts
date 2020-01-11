import ISprite from './sprite';

export default interface IBoard {
	setBoard(sprites: ISprite[]): ISprite[];
}
