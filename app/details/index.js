import React from 'react'
import {
    StyleSheet,
    View,
    Text,
    ActivityIndicator,
    Dimensions,
    TouchableOpacity,
    Image,
    FlatList,
    TextInput,
    Modal,
    Alert,
} from 'react-native'
import Video from 'react-native-video'
import Icon from 'react-native-vector-icons/Ionicons'
import request from '../common/request'
import config from '../common/config'
import Button from 'react-native-button'

const width = Dimensions.get('window').width;
const cachedResults = {
    nextPage: 1,
    items: [],
    total: 0,
};

export default class HomeScreen extends React.Component {
    constructor (props) {
        super(props);
        let data = this.props.navigation.getParam('data') || {};
        this.state = {
            rate: 1,
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


            isLoadingTail: false,
            isRefreshing: false,
            comments: [],
            modalVisible: false,
            isSending: false,
            content: '',
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

    _fetchData (page = 1) {
        let url = config.api.base + config.api.comment;
        request.get(url, {
            creation: 124,
            accessToken: '4556',
            page,
        }).then((responseJson) => {
            if (!responseJson.success)
                throw responseJson;
            let {
                data,
                total
            } = responseJson;
            let items = cachedResults.items.slice();
            if (page !== 0) {
                items = items.concat(data);
                cachedResults.nextPage += 1;
            } else {
                items = data.concat(items);
            }
            cachedResults.items = items;
            cachedResults.total = total;
            setTimeout(() => {
                if (page !== 0) {
                    this.setState({
                        isLoadingTail: false,
                        comments: cachedResults.items,
                    })
                } else {
                    this.setState({
                        isRefreshing: false,
                        comments: cachedResults.items,
                    })
                }
            }, 20);
        }).catch(error => {
            console.error(error);
            this.setState({
                isLoadingTail: false,
                isRefreshing: false,
            })
        });
    }

    _renderRow ({item}) {
        return (
            <View key={item._id} style={styles.replyBoxStyle}>
                <Image style={styles.replyAvatarStyle} source={{uri: item.replyBy.avatar}}/>
                <View style={styles.replyDescBoxStyle}>
                    <Text style={styles.replyNicknameStyle}>{item.replyBy.nickname}</Text>
                    <Text style={styles.replyContentStyle}>{item.content}</Text>
                </View>
            </View>
        )
    }

    _hasMore () {
        return cachedResults.items.length < cachedResults.total;
    }

    _fetchMoreData () {
        if (!this._hasMore() || this.state.isLoadingTail) {
            return;
        }
        let page = cachedResults.nextPage;
        this._fetchData(page);
    }

    _renderFooter () {
        if (!this._hasMore() && cachedResults.total !== 0) {
            return (
                <View style={styles.loadingMore}>
                    <Text style={styles.loadingText}>没有更多了</Text>
                </View>
            )
        }
        if (!this.state.isLoadingTail) {
            return <View style={styles.loadingMore} />
        }
        return (
            <ActivityIndicator style={styles.loadingMore} />
        )
    }

    _setModalVisible (visible) {
        this.setState({
            modalVisible: visible,
        });
        !visible && (this.setState({
            content: '',
        }))
    }

    _renderHeader (data) {
        return (
            <View  style={styles.listHeaderStyle}>
                <View style={styles.infoBoxStyle}>
                    <Image style={styles.avatarStyle} source={{uri: data.author.avatar}}/>
                    <View style={styles.descBoxStyle}>
                        <Text style={styles.nicknameStyle}>{data.author.nickname}</Text>
                        <Text style={styles.titleStyle}>{data.title}</Text>
                    </View>
                </View>

                <View style={styles.commentBoxStyle}>
                    <View style={styles.commentStyle}>
                        <TextInput
                            style={styles.commentInputStyle}
                            placeholder="敢不敢评论一个..."
                            multiline={true} onFocus={() => {this._setModalVisible(true)}}/>
                    </View>
                </View>
                <View style={styles.commentAreaStyle}>
                    <Text style={styles.commentAreaTextStyle}>精彩评论</Text>
                </View>
            </View>
        )
    }

    _submit () {
        if (!this.state.content)
            return Alert.alert('留言不能为空');
        if (this.state.isSending)
            return Alert.alert('正在评论中！');
        this.setState({
            isSending: true,
        }, () => {
            let body = {
                accessToken: 'xxx',
                creation: '123554',
                content: this.state.content,
            };
            let url = config.api.base + config.api.comment;
            request.post(url, body).then((responseJson) => {
                if (!responseJson.success)
                    throw responseJson;
                let items = cachedResults.items.slice();
                items = [{
                    _id: new Date().getDate() + '',
                    content: this.state.content,
                    replyBy: {
                        nickname: '狗狗说',
                        avatar: 'http://dummyimage.com/640x640/f27988',
                    }
                }].concat(items);
                cachedResults.items = items;
                cachedResults.total = cachedResults.total + 1;
                this.setState({
                    isSending: false,
                    comments: cachedResults.items,
                });
                this._setModalVisible(false);
            }).catch(error => {
                console.error(error);
                this.setState({
                    isSending: false,
                });
                this._setModalVisible(false);
                Alert.alert('留言失败，稍后重试')
            });
        });
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
                <FlatList
                    style={ styles.wrap }
                    keyExtractor={(item) => item._id}
                    data={this.state.comments}
                    renderItem={ this._renderRow.bind(this) }
                    onEndReached={ this._fetchMoreData.bind(this) }
                    onEndReachedThreshold={ 1 }
                    ListFooterComponent={ this._renderFooter.bind(this) }
                    ListHeaderComponent={ () => this._renderHeader(data) }
                />

                <Modal
                    animationType={'fade'}
                    visible={this.state.modalVisible}
                    onRequestClose={() => {this._setModalVisible(false)}}>
                    <View style={styles.modalContainerStyle}>
                        <Icon
                            name="ios-close"
                            style={styles.closeIconStyle}
                            onPress={() => {this._setModalVisible(false)}}/>
                        <View style={styles.commentBoxStyle}>
                            <View style={styles.commentStyle}>
                                <TextInput
                                    style={styles.commentInputStyle}
                                    placeholder="敢不敢评论一个..."
                                    multiline={true}
                                    defaultValue={this.state.content}
                                    onChangeText={(text) => {
                                        this.setState({
                                            content: text,
                                        })
                                    }}
                                />
                            </View>
                        </View>
                        <Button
                            style={styles.submitBtnStyle}
                            onPress={this._submit.bind(this)}
                        >评论</Button>
                    </View>
                </Modal>
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
    },
    loadingMore: {
        marginVertical: 20,
    },
    loadingText: {
        color: '#777',
        textAlign: 'center',
    },
    listHeaderStyle: {
        width,
        marginTop: 10,
    },
    commentBoxStyle: {
        marginTop: 10,
        marginBottom: 10,
        padding: 8,
        width,
    },
    commentStyle: {
        paddingLeft: 2,
        color: '#333',
        borderWidth: 1,
        borderColor: '#ddd',
        borderRadius: 4,
        fontSize: 14,
        height: 80,
    },
    commentAreaStyle: {
        width,
        paddingBottom: 6,
        paddingLeft: 10,
        paddingRight: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#eee',
    },
    commentAreaTextStyle: {

    },
    modalContainerStyle: {
        flex: 1,
        paddingTop: 45,
        backgroundColor: '#fff',
    },
    closeIconStyle: {
        alignSelf: 'center',
        fontSize: 30,
        color: '#ee753c',
    },
    submitBtnStyle: {
        width: width - 20,
        padding: 16,
        marginTop: 20,
        marginBottom: 20,
        borderWidth: 1,
        borderColor: '#ee753c',
        borderRadius: 4,
        color: '#ee753c',
        fontSize: 18,
    }
});
