import { render } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';

import InfoBoard from '../info-board';
import IInfoBoardProps from '../interfaces/info-board-props';

describe('Info Board', () => {
	it('Should render correctly', () => {
		const defaultProps: IInfoBoardProps = {
			gameOver: true,
			score: 1000,
			containerHeight: 1000,
			startGame: vi.fn(),
		};

		const { container } = render(<InfoBoard {...defaultProps} />);

		expect(container.firstChild).toMatchSnapshot();
	});

	it('Should start the game when the button is pressed', () => {
		const startGame = vi.fn();
		const { getByRole } = render(
			<InfoBoard gameOver={false} score={0} containerHeight={1000} startGame={startGame} />,
		);

		getByRole('button', { name: 'Play Game' }).click();

		expect(startGame).toHaveBeenCalled();
	});
});
