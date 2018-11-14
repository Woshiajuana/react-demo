/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, { Component } from 'react'
import {
    StyleSheet,
} from 'react-native'
import {
    createBottomTabNavigator,
} from 'react-navigation'
import Icon from 'react-native-vector-icons/Ionicons'

import Creation from './creation'
import Edit from './edit'
import Account from './account'

type Props = {};

export default createBottomTabNavigator(
    {
        Creation: {
            screen: Creation,
            navigationOptions: {
                header: null, // 无标题栏
                tabBarLabel: '集锦',
                tabBarIcon: ({focused}) => {
                    return focused
                        ? <Icon name="ios-videocam" style={ styles.tabIconStyle } color="#ed7f30"/>
                        : <Icon name="ios-videocam" style={ styles.tabIconStyle } color="#9d9d9d"/>;
                },
            },
        },
        Edit: {
            screen: Edit,
            navigationOptions: {
                header: null, // 无标题栏
                tabBarLabel: '创意',
                tabBarIcon: ({focused}) => {
                    return focused
                        ? <Icon name="ios-recording" style={ styles.tabIconStyle } color="#ed7f30"/>
                        : <Icon name="ios-recording" style={ styles.tabIconStyle } color="#9d9d9d"/>;
                },
            },
        },
        Account: {
            screen: Account,
            navigationOptions: {
                header: null, // 无标题栏
                tabBarLabel: '更多',
                tabBarIcon: ({focused}) => {
                    return focused
                        ? <Icon name="ios-more" style={ styles.tabIconStyle } color="#ed7f30"/>
                        : <Icon name="ios-more" style={ styles.tabIconStyle } color="#9d9d9d"/>;
                },
            },
        },
    },
    {
        tabBarOptions: {
            //当前选中的tab bar的文本颜色和图标颜色
            activeTintColor: '#ed7f30',
            //当前未选中的tab bar的文本颜色和图标颜色
            inactiveTintColor: '#9d9d9d',
            //是否显示tab bar的图标，默认是false
            showIcon: true,
            //showLabel - 是否显示tab bar的文本，默认是true
            showLabel: true,
            //是否将文本转换为大小，默认是true
            upperCaseLabel: false,
            //material design中的波纹颜色(仅支持Android >= 5.0)
            pressColor: '#788493',
            //按下tab bar时的不透明度(仅支持iOS和Android < 5.0).
            pressOpacity: 0.8,
            //tab bar的样式
            style: {
                backgroundColor: '#fff',
                paddingBottom: 0,
                borderTopWidth: 0.5,
                borderTopColor: '#ddd',
                height: 80,
                paddingTop: 0,
            },
            // tab bar的文本样式
            labelStyle: {
                fontSize: 11,
                margin: 0,
                marginBottom: 5,
                marginTop: -10,
            },
            // tab 页指示符的样式 (tab页下面的一条线).
            indicatorStyle: {
                height: 0,
            },
            // 选项卡的样式对象
            tabStyle: {
                alignItems: 'center',
                justifyContent: 'center',
            }
        },
        //tab bar的位置, 可选值： 'top' or 'bottom'
        tabBarPosition: 'bottom',
        //是否允许滑动切换tab页
        swipeEnabled: true,
        //是否在切换tab页时使用动画
        animationEnabled: false,
        //是否懒加载
        lazy: true,
        //返回按钮是否会导致tab切换到初始tab页？ 如果是，则设置为initialRoute，否则为none。 缺省为initialRoute。
        backBehavior: 'none',
    }
)

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
    tabIconStyle: {
        width: 40,
        height: 40,
        fontSize: 40,
        textAlign: 'center',
    }
});
