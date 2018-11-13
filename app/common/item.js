
import React, { Component } from 'react'
import {
    StyleSheet,
    Dimensions,
    View,
    Text,
    TouchableHighlight,
    ImageBackground,
    Alert,
} from 'react-native'
import Icon from 'react-native-vector-icons/Ionicons'
import request from '../common/request'
import config from '../common/config'

const width = Dimensions.get('window').width;
type Props = {};

export default class Item extends Component<Props> {

    constructor (props) {
        super(props);
        let {
            item
        } = this.props;
        this.state = {
            item,
        }
    }

    _up () {
        let {
            voted,
            _id,
        } = this.state.item;
        let url = config.api.base + config.api.up;
        let body = {
            id: _id,
            up: !voted ? 'yes' : 'no',
            accessToken: 'abcde',
        };
        request.post(url, body).then((data) => {
            if (!data.success)
                throw data;
            let {
                item
            } = this.props;
            item.voted = !voted;
            this.setState({
                item,
            })
        }).catch((err) => {
            console.log(err);
            Alert.alert(
                '温馨提示',
                '点赞失败，稍后重试',
                [
                    { text: '确认', onPress: () => console.log('OK Pressed') },
                ],
                { cancelable: false }
            )
        })
    }

    _jump () {
        console.log(2)
        this.props.navigation.navigate('Details')
    }

    render () {
        let {
            item
        } = this.state;
        return (
            <TouchableHighlight onPress={ this._jump.bind(this) }>
                <View style={ styles.item }>
                    <Text style={ styles.title }>{ item.title }</Text>
                    <ImageBackground
                        source={ {uri: item.thumb} }
                        style={ styles.thumb }>
                        <Icon
                            name="ios-play"
                            size={ 28 }
                            style={ styles.play }/>
                    </ImageBackground>
                    <View style={ styles.itemFooter }>
                        <View style={ styles.handleBox }>
                            <Icon
                                name="ios-heart"
                                size={ 28 }
                                color={ item.voted ? '#ed7b66' : '#333' }
                                style={ styles.icon }
                                onPress={ this._up.bind(this) }/>
                            <Text style={ styles.handleText }
                                  onPress={ this._up.bind(this) }>喜欢</Text>
                        </View>
                        <View style={ styles.handleBox }>
                            <Icon
                                name="ios-chatboxes"
                                size={ 28 }
                                style={ styles.icon }/>
                            <Text style={ styles.handleText }>评论</Text>
                        </View>
                    </View>
                </View>
            </TouchableHighlight>
        )
    }
}

const styles = StyleSheet.create({
    item: {
        width,
        marginBottom: 10,
        backgroundColor: '#fff',
    },
    thumb: {
        width,
        height: width * 0.56,
        resizeMode: 'cover',
    },
    title: {
        padding: 10,
        fontSize: 18,
        color: '#333',
    },
    itemFooter: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        backgroundColor: '#eee',
    },
    handleBox: {
        padding: 10,
        flexDirection: 'row',
        width: width / 2 - 0.5,
        justifyContent: 'center',
        backgroundColor: '#fff',
    },
    play: {
        position: 'absolute',
        bottom: 14,
        right: 14,
        width: 46,
        height: 46,
        paddingTop: 9,
        paddingLeft: 18,
        backgroundColor: 'transparent',
        borderColor: '#fff',
        borderWidth: 1,
        borderRadius: 23,
        color: '#ed7b66',
    },
    handleText: {
        paddingLeft: 12,
        fontSize: 18,
        color: '#333',
    },
    icon: {
        // color: '#333',
    },
});
