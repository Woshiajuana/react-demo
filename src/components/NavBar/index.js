import React, {Component} from 'react';
import { NavLink } from 'react-router-dom'

import './index.scss'

class NavBar extends Component {
    render() {
        return (
            <div className='nav-bar'>
                <NavLink to='/home'>首页</NavLink>
                <NavLink to='/list'>列表页</NavLink>
                <NavLink to='/added'>添加页</NavLink>
            </div>
        );
    }
}

export default NavBar;
