import React, { Component }                 from 'react'
import { NavLink }                             from 'react-router-dom'

import './index.scss'

class NavBar extends Component {
    render () {
        return (
            <div className="nav-wrap">
                <NavLink to='/' exact className="nav-item">
                    <svg className="nav-home-item">
                        <use xlinkHref="#nav-home"></use>
                    </svg>
                    <span>首页</span>
                </NavLink>
                <NavLink to='/account' className="nav-item">
                    <svg className="nav-account-item">
                        <use xlinkHref="#nav-account"></use>
                    </svg>
                    <span>记账</span>
                </NavLink>
                <NavLink to='/bill' className="nav-item">
                    <svg className="nav-bill-item">
                        <use xlinkHref="#nav-bill"></use>
                    </svg>
                    <span>账单</span>
                </NavLink>
                <NavLink to='/chart' className="nav-item">
                    <svg className="nav-chart-item">
                        <use xlinkHref="#nav-chart"></use>
                    </svg>
                    <span>分析</span>
                </NavLink>
            </div>
        )
    }
}

export default NavBar;
