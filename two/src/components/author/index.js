import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Route, Switch } from 'react-router-dom'
import List from './List'

class Author extends Component {
    render() {
        const { match } = this.props
        return (
            <div>
                <Route
                    exact
                    path={`${match.url}`}
                    render={() => <List fetch={{ url: '/authorlist.json' }} />}
                />
            </div>
        )
    }
}

export default Author