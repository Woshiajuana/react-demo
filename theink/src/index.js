import React, { Component }         from 'react'
import ReactDOM                     from 'react-dom'
import {
    HashRouter,
    Route,
    Switch,
}                                   from 'react-router-dom'

import Main                         from './containers/app/Main'
import List                         from './containers/app/List'
import Svg                          from './containers/svg/Svg'

import registerServiceWorker        from './registerServiceWorker'

import './assets/lib/flexible'
import './index.scss'

class App extends Component {
    render () {
        return (
            <div>
                <HashRouter>
                    <Switch>
                        <Route path="/" component={Main}/>
                    </Switch>
                </HashRouter>
                <Svg/>
            </div>
        );
    }
}

ReactDOM.render(<App />, document.getElementById('root'));
registerServiceWorker();
