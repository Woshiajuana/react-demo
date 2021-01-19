import React, {Component} from 'react'
import { connect } from 'react-redux'

class List extends Component {
    render() {
        return (
            <ul>
                { this.props.persons.map(item => <li key={item.id}>{ `姓名：${item.name} —— 年龄：${item.age}` }</li>)}
            </ul>
        );
    }
}

export default connect(
    state => ({
        persons: state.persons,
    }),
    {}
) (List);
