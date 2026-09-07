import React from 'react';
import { createRoot } from 'react-dom/client';

import AntRun from './components/ant-run/ant-run';
import reportWebVitals from './reportWebVitals';

import './index.scss';

const container = document.getElementById('root');
if (!container) throw new Error('No #root element to mount the game into');

createRoot(container).render(
	<React.StrictMode>
		<AntRun />
	</React.StrictMode>,
);

reportWebVitals();
