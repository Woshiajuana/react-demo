import React, { Component }         from 'react'
import {
    HashRouter,
    Route,
    Switch,
}                                   from 'react-router-dom'

import Home                         from './Home'
import List                         from './List'
import Account                      from './Account'
import Bill                         from './Bill'
import Chart                        from './Chart'
import NavBar                       from './../../components/nav-bar'

import './Main.scss'

class Main extends Component {
    render () {
        return (
            <div className="view-wrap">
                <NavBar/>
                <HashRouter>
                    <Switch>
                        <Route path="/list" component={List}/>
                        <Route path="/account" component={Account}/>
                        <Route path="/bill" component={Bill}/>
                        <Route path="/chart" component={Chart}/>
                        <Route path="/" component={Home}/>
                    </Switch>
                </HashRouter>
            </div>
        );
    }
}

export default Main;
