import React, { Component } from 'react'
// import { Link } from 'react-router-dom'
import logo from '../../assets/images/logo.svg'
import './index.scss'

class Head extends Component {
    render () {
        return (
            <div className="header-wrap">
                <span className="header-logo">
                    <img src={logo} />
                </span>
                <h1 className="header-title">Sam's Blog</h1>
                <p className="header-sub-title">If   you   can't   measure   it ,    you   can't   improve   it</p>
            </div>
        )
    }
}

export default Head;
