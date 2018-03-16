import React, { Component } from 'react'
import { Route, BrowserRouter, Switch, Redirect } from 'react-router-dom'
import Home from './../views/home'
import List from './../views/list'
import Head from './../components/part/head'
import Menus from './../components/part/menus'

class Routers extends Component {
    render() {
        return(
            <BrowserRouter>
                <div>
                    <Head/>
                    <Menus/>
                    <Switch>
                        {/*<Route exact path='/' component={Home}/>*/}
                        <Route path='/home' component={Home}/>
                        <Redirect exact from='/' to='/home'/>
                        <Route path='/list' component={List}/>
                        {/*<Route path='/404' component={NotFound}/>*/}
                        {/*<Route path='/admin' component={Admin}/>*/}
                        {/*<Route component={Front} />*/}
                    </Switch>
                </div>
            </BrowserRouter>
        )
    }
}

export default Routers;
