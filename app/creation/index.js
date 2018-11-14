

import React, { Component } from 'react'
import {
    StyleSheet,
    Text,
    View,
    FlatList,
    ActivityIndicator,
} from 'react-native'
import request from '../common/request'
import config from '../common/config'
import Item from '../common/item'

type Props = {};

const cachedResults = {
    nextPage: 1,
    items: [],
    total: 0,
};

export default class List extends Component<Props> {

    constructor (props) {
        super(props);
        this.state = {
            data: [],
            isLoadingTail: false,
            isRefreshing: false,
        };
    }

    _renderRow ({item}) {
        return (
            <Item item={ item } navigation={ this.props.navigation } />
        )
    }

    componentDidMount () {
        this._fetchData()
    }

    _fetchData (page = 1) {
        if (page !== 0) {
            this.setState({
                isLoadingTail: true,
            });
        } else {
            this.setState({
                isRefreshing: true,
            });
        }
        request.get(config.api.base + config.api.creations, {
            accessToken: 'xxx',
            page,
        }).then(responseJson => {
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
                        data: cachedResults.items,
                    })
                } else {
                    this.setState({
                        isRefreshing: false,
                        data: cachedResults.items,
                    })
                }
            }, 20)
        }).catch(error => {
            console.error(error);
            this.setState({
                isLoadingTail: false,
                isRefreshing: false,
            })
        });
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

    _onRefresh () {
        if (!this._hasMore() || this.state.isRefreshing) {
            return;
        }
        this._fetchData(0);
    }

    render () {
        return (
            <View style={ styles.container }>
                <View style={ styles.header }>
                    <Text style={ styles.headerTitle }>列表页面</Text>
                </View>
                <FlatList
                    style={ styles.wrap }
                    keyExtractor={(item) => item._id}
                    data={this.state.data}
                    renderItem={ this._renderRow.bind(this) }
                    onEndReached={ this._fetchMoreData.bind(this) }
                    onEndReachedThreshold={ 1 }
                    ListFooterComponent={ this._renderFooter.bind(this) }
                    onRefresh={ this._onRefresh.bind(this) }
                    refreshing={ this.state.isRefreshing }
                />
            </View>
        )
    }
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f5fcff',
    },
    header: {
        paddingTop: 25,
        paddingBottom: 12,
        backgroundColor: '#ee735c',
    },
    headerTitle: {
        color: '#fff',
        fontSize: 16,
        textAlign: 'center',
        fontWeight: '600',
    },
    loadingMore: {
        marginVertical: 20,
    },
    loadingText: {
        color: '#777',
        textAlign: 'center',
    }
});
