import React, {Component} from 'react'
import { NavLink, withRouter } from 'react-router-dom'

import './index.scss'

class NavBar extends Component {
    render() {
        return (
            <div className='nav-bar'>
                <NavLink activeClassName='active' to='/home'>首页</NavLink>
                <NavLink activeClassName='active' to='/list'>列表页</NavLink>
                <NavLink activeClassName='active' to='/added'>添加页</NavLink>
                <span>{ `当前路径 => ${ this.props.location.pathname }` }</span>
            </div>
        );
    }
}

export default withRouter(NavBar);
