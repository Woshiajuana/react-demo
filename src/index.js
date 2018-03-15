import React, { Component } from 'react'
import ReactDOM from 'react-dom';
// import Head from './components/head'
import Home from './views/home'
import List from './views/list'
import './App.css'
import { Route, BrowserRouter, Switch, Redirect } from 'react-router-dom'

import registerServiceWorker from './registerServiceWorker';
class App extends Component {
    render() {
        return (
            <BrowserRouter>
                <div>
                    {/*<Head/>*/}
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
        );
    }
}

ReactDOM.render(<App />, document.getElementById('root'));
registerServiceWorker();
