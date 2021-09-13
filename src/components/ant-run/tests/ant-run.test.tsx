import { shallow } from 'enzyme';

import AntRun from '../ant-run';
import IAntRunProps from '../interfaces/ant-run-props';

describe('SAnt Run', () => {
	it('Should render correctly', () => {
		const defaultProps: IAntRunProps = {};
		const ant = shallow(<AntRun {...defaultProps} />);
		expect(ant).toMatchSnapshot();
	});
});