import React, {Component} from 'react'
import { connect } from 'react-redux'


class Home extends Component {
    render() {
        return (
            <div>
                <p>共有：{this.props.count} 人</p>
            </div>
        );
    }
}

export default connect(
    state => ({
        count: state.persons.length,
    }),
    {},
) (Home);
