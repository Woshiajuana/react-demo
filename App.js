
import React, { Component } from 'react'

import {
    AsyncStorage,
} from 'react-native'
import {
    createStackNavigator,
} from 'react-navigation'
import Home from './app/index'
import Details from './app/details'
import Login from './app/account/login'

const Navigator = createStackNavigator(
    {
        // Login: {
        //     screen: Login,
        //     navigationOptions: {
        //         header: null // 无标题栏
        //     },
        //     transitionConfig:()=>({
        //         screenInterpolator:CardStackStyleInterpolator.forHorizontal,
        //     })
        // },
        Home: {
            screen: Home,
            navigationOptions: {
                header: null // 无标题栏
            },
        },
        Details: {
            screen: Details,
            navigationOptions: {
                header: null // 无标题栏
            },
        },
    },
    {
        initialRouteName: 'Home',
    },
);

export default class App extends Component<Props> {
    constructor (props) {
        super(props);
        this.state = {
            user: null,
            logined: false,
        }
    }
    componentWillMount () {
        this._asyncAppStatus();
    }
    _asyncAppStatus () {
        AsyncStorage.getItem('user').then((data) => {
            let user = '';
            let newState = {};
            if (data) {
                user = JSON.parse(data);
            }
            if (user && user.accessToken) {
                newState.user = user;
                newState.logined = true;
            } else {
                newState.logined = false;
            }
            this.setState({...newState})
        })
    }
    _onLoginEd (user) {
        let data = JSON.stringify(user);
        AsyncStorage.setItem('user', data).then(() => {
            this.setState({
                user,
                logined: true,
            })
        })
    }
    render () {
        if (!this.state.logined) {
            return <Login onLoginEd={this._onLoginEd.bind(this)}/>
        }
        return (
            <Navigator />
        )
    }
}





