
import React from 'react'
import {

} from 'react-native'
import {
    createDrawerNavigator,
} from 'react-navigation'
import App from './app/index'
import Details from './app/details'

export default createDrawerNavigator(
    {
        App: App,
        Details: Details,
    },
    {
        initialRouteName: 'App',
    }
);




