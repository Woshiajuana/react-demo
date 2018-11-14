
import React from 'react'
import {

} from 'react-native'
import {
    createStackNavigator,
} from 'react-navigation'
import App from './app/index'
import Details from './app/details'

export default createStackNavigator(
    {
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
        initialRouteName: 'App',
    },
);




