import { render } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import GameStatusTop from '../game-status-top';
import IGameStatusTopProps from '../interfaces/game-status-top-props';

describe('Game Status Top', () => {
	it('Should render correctly', () => {
		const defaultProps: IGameStatusTopProps = {
			score: 1000,
			lives: 3,
		};

		const { container } = render(<GameStatusTop {...defaultProps} />);

		expect(container.firstChild).toMatchSnapshot();
	});

	it('Should draw one life icon per remaining life', () => {
		const { getAllByAltText } = render(<GameStatusTop score={0} lives={3} />);

		expect(getAllByAltText('lives')).toHaveLength(3);
	});
});
