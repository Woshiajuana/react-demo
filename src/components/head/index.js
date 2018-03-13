import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import './index.scss'

class Head extends Component {
    render () {
        return (
            <div className="header-wrap">
                <p className="header-prompt">头部</p>
                <Link to="home">首页</Link>
                <Link to="list">列表页</Link>
            </div>
        )
    }
}

export default Head;
