import React, {Component, Fragment} from 'react';
import { Route, Switch, Redirect } from 'react-router-dom'

import Home from './pages/Home'
import List from './pages/List'
import Added from './pages/Added'
import NavBar from './components/NavBar'

class App extends Component {
    render() {
        return (
            <Fragment>
                <NavBar/>
                <Switch>
                    <Route to='/home' component={Home}/>
                    <Route to='/list' component={List}/>
                    <Route to='/added' component={Added}/>
                    <Redirect to='/home'/>
                </Switch>
            </Fragment>
        );
    }
}

export default App;
