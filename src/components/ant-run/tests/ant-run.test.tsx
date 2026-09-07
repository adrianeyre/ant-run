import { render } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import AntRun from '../ant-run';
import IAntRunProps from '../interfaces/ant-run-props';

describe('Ant Run', () => {
	it('Should render correctly', () => {
		const defaultProps: IAntRunProps = {};
		const { container } = render(<AntRun {...defaultProps} />);

		expect(container.firstChild).toMatchSnapshot();
	});

	it('Should open on the info board rather than mid-game', () => {
		const { getByRole } = render(<AntRun />);

		expect(getByRole('button', { name: 'Play Game' })).toBeInTheDocument();
	});
});
