import React from 'react';
import ReactDOM from 'react-dom';
import './assets/scss/_reset.scss'
import './assets/scss/_define.scss'
import 'antd/dist/antd.css'
import App from './App';
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(<App />, document.getElementById('root'));
registerServiceWorker();
