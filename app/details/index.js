import React from 'react'
import {
    StyleSheet,
    View,
    Text,
    ActivityIndicator,
    Dimensions,
    TouchableOpacity,
    Image,
    ScrollView,
    ListView,
} from 'react-native'
import Video from 'react-native-video'
import Icon from 'react-native-vector-icons/Ionicons'
import request from '../common/request'
import config from '../common/config'

const width = Dimensions.get('window').width;

export default class HomeScreen extends React.Component {
    constructor (props) {
        super(props);
        let data = this.props.navigation.getParam('data') || {};
        let ds = new ListView.DataSource({
            rowHasChanged: (r1, r2) => r1 !== r2,
        });
        this.state = {
            rate: 1,
            dataSource: ds.cloneWithRows([]),
            videoOk: true,
            muted: true,
            playing: false,
            repeat: false,
            videoLoaded: false,
            paused: false,
            videoProgress: 0,
            videoTotal: 0,
            currentTime: 0,
            resizeMode: 'contain',
            data,
        }
    }

    _onLoadStart () {
        console.log('_onLoadStart')
    }

    _onLoad () {
        console.log('_onLoad')
    }

    _onProgress (data) {
        if (!this.state.videoLoaded)
            this.setState({
                videoLoaded: true,
            });

        if (!this.state.playing)
            this.setState({
                playing: true,
            });
        let duration = data.seekableDuration;
        let currentTime = data.currentTime;
        let percent = Number((currentTime / duration).toFixed(2));
        this.setState({
            videoTotal: duration,
            currentTime: Number(currentTime.toFixed(2)),
            videoProgress: percent,
        })
    }

    _onEnd () {
        console.log('_onEnd')
        this.setState({
            videoProgress: 1,
            playing: false,
        })
    }

    _onError (err) {
        console.log('_onError', err)
        this.setState({
            videoOk: false,
        })
    }

    _rePlay () {
        this.refs.videoPlayer.seek(0)
    }

    _pause () {
        console.log(1)
        if (!this.state.paused)
            this.setState({
                paused: true,
            })
    }

    _resume () {
        if (this.state.paused)
            this.setState({
                paused: false,
            })
    }

    _pop () {
        this.props.navigation.goBack();
    }

    componentDidMount () {
        this._fetchData();
    }

    _fetchData () {
        let url = config.api.base + config.api.comment;
        request.get(url, {
            id: 124,
            accessToken: '4556',
        }).then((responseJson) => {
            if (!responseJson.success)
                throw responseJson;
            let comments = responseJson.data;
            if (comments && comments.length > 0) {
                this.setState({
                    comments,
                    dataSource: this.state.dataSource.cloneWithRows(comments),
                })
            }
        }).catch(error => {
            console.error(error);
        });
    }

    _renderRow (row) {
        return (
            <View key={row._id} style={styles.replyBoxStyle}>
                <Image style={styles.replyAvatarStyle} source={{uri: row.replyBy.avatar}}/>
                <View style={styles.replyDescBoxStyle}>
                    <Text style={styles.replyNicknameStyle}>{row.replyBy.nickname}</Text>
                    <Text style={styles.replyContentStyle}>{row.content}</Text>
                </View>
            </View>
        )
    }

    render() {
        let {data} = this.state;
        console.log(data);
        return (
            <View style={styles.container}>
                <View style={styles.header}>
                    <TouchableOpacity
                        style={styles.popBoxStyle}
                        onPress={this._pop.bind(this)}>
                        <Icon onPress={this._rePlay.bind(this)}
                              name="ios-arrow-back"
                              style={styles.backIconStyle}/>
                        <Text style={styles.backTextStyle}>返回</Text>
                    </TouchableOpacity>
                    <Text style={styles.headerTitleStyle} numberOflines={1}>视频详情</Text>
                </View>
                <View style={styles.videoBoxStyle}>
                    <Video
                        style={styles.videoStyle}
                        ref="videoPlayer"
                        volume={5}
                        paused={this.state.paused}
                        rate={this.state.rate}
                        muted={this.state.muted}
                        resizeMode={this.state.resizeMode}
                        repeat={this.state.repeat}
                        source={{uri: this.state.data.video}}
                        playInBackground={false}     // 当app转到后台运行的时候，播放是否暂停
                        onLoadStart={this._onLoadStart.bind(this)}
                        onLoad={this._onLoad.bind(this)}
                        onProgress={this._onProgress.bind(this)}
                        onEnd={this._onEnd.bind(this)}
                        onError={this._onError.bind(this)}
                    />
                    {
                        !this.state.videoOk && <Text style={styles.failTextStyle}>视频出错！很抱歉</Text>
                    }
                    {
                        !this.state.videoLoaded && <ActivityIndicator style={styles.loadingStyle} color="#ee735c" />
                    }
                    {
                        this.state.videoLoaded && !this.state.playing
                            ? <Icon onPress={this._rePlay.bind(this)}
                                    name="ios-play"
                                    style={styles.playIconStyle}/>
                            : null
                    }
                    {
                        this.state.videoLoaded
                            ? <TouchableOpacity onPress={this._pause.bind(this)}
                                                style={styles.pauseBtnStyle} >
                            {
                                this.state.paused
                                    ?  <Icon onPress={this._resume.bind(this)}
                                             name="ios-play"
                                             style={styles.resumeIconStyle}/>
                                    : <Text/>
                            }
                              </TouchableOpacity>
                            : null
                    }
                    <View style={styles.progressBoxStyle}>
                        <View style={[styles.progressBarStyle, {width: width * this.state.videoProgress}]}/>
                    </View>
                </View>
                <ScrollView
                    style={styles.scrollViewStyle}
                    showsVerticalScrollIndicator={false}
                    automaticallyAdjustContentInsets={false}>
                    <View style={styles.infoBoxStyle}>
                        <Image style={styles.avatarStyle} source={{uri: data.author.avatar}}/>
                        <View style={styles.descBoxStyle}>
                            <Text style={styles.nicknameStyle}>{data.author.nickname}</Text>
                            <Text style={styles.titleStyle}>{data.title}</Text>
                        </View>
                    </View>
                    <ListView
                        dataSource={this.state.dataSource}
                        renderRow={this._renderRow}
                        enableEmptySections={true}
                        showsVerticalScrollIndicator={false}
                        automaticallyAdjustContentInsets={false}
                    />
                </ScrollView>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f5fcff',
    },
    videoBoxStyle: {
        width,
        height: width * 0.56,
        backgroundColor: '#000',
    },
    videoStyle: {
        width,
        height: width * 0.56,
        backgroundColor: '#000',
    },
    loadingStyle: {
        position: 'absolute',
        left: 0,
        top: 80,
        width,
        alignSelf: 'center',
        backgroundColor: 'transparent',
    },
    progressBoxStyle: {
        width,
        height: 2,
        backgroundColor: '#ccc',
    },
    progressBarStyle: {
        width: 1,
        height: 2,
        backgroundColor: '#ff6600',
    },
    playIconStyle: {
        position: 'absolute',
        top: 120,
        left: width / 2 - 30,
        width: 60,
        height: 60,
        paddingTop: 6,
        paddingLeft: 22,
        backgroundColor: 'transparent',
        borderColor: '#fff',
        borderWidth: 1,
        borderRadius: 30,
        fontSize: 48,
        color: '#ed7b66',
    },
    pauseBtnStyle: {
        position: 'absolute',
        left: 0,
        top: 0,
        width,
        height: 360,
    },
    resumeIconStyle: {
        position: 'absolute',
        top: 120,
        left: width / 2 - 30,
        width: 60,
        height: 60,
        paddingTop: 6,
        paddingLeft: 22,
        backgroundColor: 'transparent',
        borderColor: '#fff',
        borderWidth: 1,
        borderRadius: 30,
        fontSize: 48,
        color: '#ed7b66',
    },
    failTextStyle: {
        position: 'absolute',
        left: 0,
        top: 90,
        width,
        textAlign: 'center',
        backgroundColor: 'transparent',
        color: '#fff',
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        width,
        height: 64,
        paddingTop: 20,
        paddingLeft: 10,
        paddingRight: 10,
        borderBottomWidth: 1,
        borderColor: 'rgba(0,0,0,0.1)',
        backgroundColor: '#fff',
    },
    popBoxStyle: {
        position: 'absolute',
        left: 12,
        top: 25,
        flexDirection: 'row',
        alignItems: 'center',
    },
    backIconStyle: {
        color: '#999',
        fontSize: 30,
        marginRight: 5,
    },
    backTextStyle: {
        color: '#999',
        fontSize: 18,
    },
    headerTitleStyle: {
        width: width -120,
        textAlign: 'center',
        fontSize: 20,
    },
    scrollViewStyle: {

    },
    infoBoxStyle: {
        width,
        flexDirection: 'row',
        justifyContent: 'center',
        marginTop: 10,
    },
    avatarStyle: {
        width: 60,
        height: 60,
        marginRight: 10,
        marginLeft: 10,
        borderRadius: 30,
        // backgroundColor: 'red',
    },
    descBoxStyle: {
        flex: 1,
    },
    nicknameStyle: {
        fontSize: 18,
    },
    titleStyle: {
        marginTop: 8,
        fontSize: 16,
        color: '#666',
    },
    replyBoxStyle: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
        marginTop: 10,
    },
    replyAvatarStyle: {
        width: 40,
        height: 40,
        marginRight: 10,
        marginLeft: 10,
        borderRadius: 20,
    },
    replyDescBoxStyle: {
        flex: 1,
    },
    replyNicknameStyle: {
        color: '#666',
    },
    replyContentStyle: {
        color: '#666',
        marginTop: 4,
    }
});
