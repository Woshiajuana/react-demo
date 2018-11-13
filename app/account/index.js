

import React, { Component } from 'react'
import {
    Platform,
    StyleSheet,
    Text,
    View,
    Image,
} from 'react-native'

type Props = {};

export default class Account extends Component<Props> {
    render () {
        return (
            <View style={ styles.container }>
                <Text>账户页面</Text>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#f5fcff',
    }
});
