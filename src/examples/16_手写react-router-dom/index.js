
import React from 'react'
import { Router, Link, Switch, Route } from './react-router-dom/react-router-dom'
import Home from './Home'
import Details from './Details'
import List from './List'

import './index.css'

export default function App () {
    return (
        <Router>
            <div className="nav16">
                <Link to="/16_手写react-router-dom/">首页面</Link>
                <Link to="/16_手写react-router-dom/list">列表页面</Link>
                <Link to="/16_手写react-router-dom/details">详情页面</Link>
            </div>
            <Switch>
                <Route path='/16_手写react-router-dom/list' component={List}/>
                <Route path='/16_手写react-router-dom/details' component={Details}/>
                <Route path='/16_手写react-router-dom/' component={Home}/>
            </Switch>
        </Router>
    );

}
