import React, { Component } from 'react'
import Head from './components/head'
import Home from './views/home'
import List from './views/list'
import { Route, Router, HashRouter, Switch, Redirect } from 'react-router-dom'

class App extends Component {
  render() {
    return (
        <HashRouter>
            <div>
                <Head/>
                <Switch>
                    {/*<Route exact path='/' component={Home}/>*/}
                    <Redirect from='/' to='/home'/>
                    <Route path='/home' component={Home}/>
                    <Route path='/list' component={List}/>
                </Switch>
            </div>
        </HashRouter>
    );
  }
}

export default App;
