import React from 'react';
import ReactDOM from 'react-dom';
import 'react-app-polyfill/ie11';
import 'react-app-polyfill/stable';

import AntRun from './components/ant-run/ant-run';

import './index.scss';
import reportWebVitals from './reportWebVitals';

ReactDOM.render(
    <React.StrictMode>
        <AntRun />
    </React.StrictMode>,
    document.getElementById('root')
);

reportWebVitals();
