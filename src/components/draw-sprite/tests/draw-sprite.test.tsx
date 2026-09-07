import { render } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';

import DrawSprite from '../draw-sprite';
import IDrawSpriteProps from '../interfaces/draw-sprite-props';
import Player from '../../../classes/player';

describe('Draw Sprite', () => {
	it('Should render correctly', () => {
		const defaultProps: IDrawSpriteProps = {
			sprite: new Player({}),
			height: 1,
			width: 1,
			containerWidth: 100,
			handleClick: vi.fn(),
		};

		const { container } = render(<DrawSprite {...defaultProps} />);

		expect(container.firstChild).toMatchSnapshot();
	});

	it('Should report a click back with the sprite it drew', async () => {
		const handleClick = vi.fn();
		const sprite = new Player({});
		const { getByAltText } = render(
			<DrawSprite
				sprite={sprite}
				height={1}
				width={1}
				containerWidth={100}
				handleClick={handleClick}
			/>,
		);

		getByAltText('sprite').click();

		expect(handleClick).toHaveBeenCalledWith(sprite);
	});
});
