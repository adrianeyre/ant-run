import ISprite from './sprite';

export default interface ITime {
	setTime(sprites: ISprite[]): void
	show(key: number, sprites: ISprite[]): void
}
