import DirectionEnum from '../enums/direction-enum';

import Player from '../player';

describe('Player', () => {
	it('Should create Player class', () => {
		const player = new Player({});

		expect(player.key).toEqual('player');
		expect(player.visable).toEqual(true);
		expect(player.x).toEqual(18);
		expect(player.y).toEqual(3);
		expect(player.width).toEqual(1);
		expect(player.height).toEqual(1);
		expect(player.initialPlayerX).toEqual(18);
		expect(player.initialPlayerY).toEqual(3);
		expect(player.zIndex).toEqual(6000);
		expect(player.direction).toEqual(DirectionEnum.RIGHT);
		expect(player.score).toEqual(0);
		expect(player.lives).toEqual(3);
		expect(player.image).toEqual('ant-right1.png');
		expect(player.isAlive).toEqual(true);
	});
});