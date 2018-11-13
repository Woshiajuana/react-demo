/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, { Component }             from 'react'
import {
    Platform,
    StyleSheet,
    Text,
    View,
    Image,
}                                       from 'react-native'
import TabNavigator                     from 'react-native-tab-navigator'
import Icon                             from 'react-native-vector-icons/Ionicons'

import Creation                         from './app/creation'
import Edit                             from './app/edit'
import Account                          from './app/account'


const instructions = Platform.select({
    ios: 'Press Cmd+R to reload,\n' + 'Cmd+D or shake for dev menu',
    android:
    'Double tap R on your keyboard to reload,\n' +
    'Shake or press menu button for dev menu',
});

type Props = {};

export default class App extends Component<Props> {
    constructor (props) {
        super(props);
        this.state = {
            selectedIndex: 0,
        }
    }
    render() {
        return (
            <TabNavigator tabBarStyle={ styles.tabBarStyle }>
                <TabNavigator.Item
                    selected={ this.state.selectedIndex === 0 }
                    allowFontScaling={ false }
                    renderIcon={()=>
                        <Icon name="ios-videocam" size={40} color="#9d9d9d"/>
                    }
                    renderSelectedIcon={()=>
                        <Icon name="ios-videocam" size={40} color="#ed7f30"/>
                    }
                    onPress={()=>
                        this.setState({
                            selectedIndex: 0
                        })
                    }>
                    <Creation/>
                </TabNavigator.Item>
                <TabNavigator.Item
                    selected={ this.state.selectedIndex === 1 }
                    titleStyle={ styles.tabBarTitleStyle }
                    selectedTitleStyle={ styles.tabBarSelectedTitleStyle }
                    allowFontScaling={ false }
                    renderIcon={()=>
                        <Icon name="ios-recording" size={40} color="#9d9d9d"/>
                    }
                    renderSelectedIcon={()=>
                        <Icon name="ios-recording" size={40} color="#ed7f30"/>
                    }
                    onPress={()=>
                        this.setState({
                            selectedIndex: 1
                        })
                    }>
                    <Edit/>
                </TabNavigator.Item>
                <TabNavigator.Item
                    selected={ this.state.selectedIndex === 2 }
                    titleStyle={ styles.tabBarTitleStyle }
                    selectedTitleStyle={ styles.tabBarSelectedTitleStyle }
                    renderIcon={()=>
                        <Icon name="ios-more" size={40} color="#9d9d9d"/>
                    }
                    renderSelectedIcon={()=>
                        <Icon name="ios-more" size={40} color="#ed7f30"/>
                    }
                    onPress={()=>
                        this.setState({
                            selectedIndex: 2
                        })
                    }>
                    <Account/>
                </TabNavigator.Item>
            </TabNavigator>
        );
    }
}

const styles = StyleSheet.create({
    tabBarStyle: {
        height: 80,
        alignItems: 'center',
        paddingTop: 15,
    },
    tabBarTitleStyle: {
        fontSize: 16,
        color: '#9d9d9d',
    },
    tabBarSelectedTitleStyle: {
        color: '#ed7f30',
    },
});
