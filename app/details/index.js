import React from 'react'
import {
    StyleSheet,
    View,
    Text,
    Dimensions,
} from 'react-native'
import Video from 'react-native-video'

const width = Dimensions.get('window').width;

export default class HomeScreen extends React.Component {
    static navigationOptions = {
        title: 'Home',
    };
    constructor (props) {
        super(props);
        this.state = {
            rate: 1,
            muted: true,
            repeat: false,
            resizeMode: 'contain',
        }
    }

    _onLoadStart () {
        console.log('_onLoadStart')
    }

    _onLoad () {
        console.log('_onLoad')
    }

    _onProgress (data) {
        console.log('_onProgress', data)
    }

    _onEnd () {
        console.log('_onEnd')
    }

    _onError (err) {
        console.log('_onError', err)
    }

    render() {
        let data = this.props.navigation.getParam('data') || {};
        console.log(data);
        return (
            <View style={styles.container}>
                <Text>Home Screen</Text>
                <View style={styles.videoBoxStyle}>
                    <Video
                        style={styles.videoStyle}
                        ref="videoPlayer"
                        volume={5}
                        paused={false}
                        rate={this.state.rate}
                        muted={this.state.muted}
                        resizeMode={this.state.resizeMode}
                        repeat={this.state.repeat}
                        source={{ uri: data.video }}

                        onLoadStart={this._onLoadStart.bind(this)}
                        onLoad={this._onLoad.bind(this)}
                        onProgress={this._onProgress.bind(this)}
                        onEnd={this._onEnd.bind(this)}
                        onError={this._onError.bind(this)}
                    />
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#f5fcff',
    },
    videoBoxStyle: {
        width,
        height: 360,
        backgroundColor: '#000',
    },
    videoStyle: {
        width,
        height: 360,
        backgroundColor: '#000',
    }
});
