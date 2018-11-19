
import React from 'react'
import {

} from 'react-native'
import {
    createStackNavigator,
} from 'react-navigation'
import App from './app/index'
import Details from './app/details'
import Login from './app/account/login'

export default createStackNavigator(
    {
        Login: {
            screen: Login,
            navigationOptions: {
                header: null // 无标题栏
            },
        },
        App: {
            screen: App,
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
        initialRouteName: 'Login',
    },
);




