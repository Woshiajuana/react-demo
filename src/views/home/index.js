import React, { Component } from 'react'
import './index.scss'
import Menus from './../../components/menus'
import Head from './../../components/head'

class Home extends Component {
    render () {
        return (
            <div className="container-wrap">
                <Head />
                <div className="menus-wrap">
                    <Menus />
                </div>
                <div className="main">
                    这里是文章列表
                </div>
            </div>
        )
    }
}

export default Home;
