import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import registerServiceWorker from './registerServiceWorker'
import Routers from './router'
import 'antd/dist/antd.css'

class App extends Component {
    render() {
        return (
            <Routers/>
        );
    }
}

ReactDOM.render(<App />, document.getElementById('root'));

registerServiceWorker();
