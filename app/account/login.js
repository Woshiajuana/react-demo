

import React, { Component } from 'react'
import {
    Platform,
    StyleSheet,
    Text,
    View,
    Image,
    TextInput,
    Alert,
} from 'react-native'
import Button from "react-native-button"
import request from '../common/request'
import config from '../common/config'


type Props = {};

export default class Login extends Component<Props> {
    constructor (props) {
        super(props);
        this.state = {
            codeSent: false,
            phoneNumber: '',
        }
    }

    _submit () {

    }

    _sendVerifyCode () {
        let phoneNumber = this.state.phoneNumber;
        if (!phoneNumber) {
            return Alert.alert('手机号不能为空');
        }
        let body = {
            phoneNumber,
        };
        let url = config.api.base + config.api.signup;
        request.post(url, body).then((responseJson) => {
            if (!responseJson.success)
                throw responseJson;
            let {
                data,
            } = responseJson;
            this._showVerifyCode();
        }).catch(error => {
            console.error(error);
        });
    }

    _showVerifyCode () {

    }

    render () {
        return (
            <View style={ styles.container }>
                <View style={ styles.signUpBoxStyle }>
                    <Text style={styles.titleStyle}>快速登录</Text>
                    <TextInput
                        placeholder="输入手机号"
                        autoCapitalize={'none'}
                        autoCorrect={false}
                        keyboardType={'number-pad'}
                        style={styles.inputStyle}
                        onChangeText={(text) => {
                            this.setState({
                                phoneNumber: text,
                            })
                        }}
                    />
                    {
                        this.state.codeSent
                            ? <Button
                                title="on"
                                style={styles.btnStyle}
                                onPress={this._submit.bind(this)}>登录</Button>
                            : <Button title="on"
                                      style={styles.btnStyle}
                                      onPress={this._submit.bind(this)}>获取验证码</Button>
                    }
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 10,
        backgroundColor: '#f9f9f9',
    },
    signUpBoxStyle: {
        marginTop: 30,
    },
    titleStyle: {
        marginBottom: 20,
        color: '#333',
        fontSize: 20,
        textAlign: 'center',
    },
    inputStyle: {
        height: 50,
        padding: 5,
        color: '#999',
        fontSize: 16,
        backgroundColor: '#fff',
        borderRadius: 4,
    },
    btnStyle: {
        padding: 10,
        marginTop: 10,
        backgroundColor: 'transparent',
        borderColor: '#ee735c',
        borderWidth: 1,
        borderRadius: 4,
        color: '#ee735c',
    }
});
