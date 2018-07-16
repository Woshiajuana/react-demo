import React, { Component }         from 'react'
import {
    HashRouter,
    Route,
}                                   from 'react-router-dom'

import Home                         from './Home'
import List                         from './List'

import './App.scss'

class App extends Component {
    render () {
        return (
            <HashRouter>
                    <Route path="/home" component={Home}/>
                    <Route path="/list" component={List}/>
            </HashRouter>
        );
    }
}

export default App;
