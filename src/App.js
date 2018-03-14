import React, { Component } from 'react'
import Head from './components/head'
import Home from './views/home'
import List from './views/list'
import { Route, Router, BrowserRouter, Switch, Redirect } from 'react-router-dom'

class App extends Component {
  render() {
    return (
        <BrowserRouter>
            <div>
                <Head/>
                <Switch>
                    {/*<Route exact path='/' component={Home}/>*/}
                    <Route path='/home' component={Home}/>
                    <Redirect exact from='/' to='/home'/>
                    <Route path='/list' component={List}/>
                </Switch>
            </div>
        </BrowserRouter>
    );
  }
}

export default App;
