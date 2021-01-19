import React, {Component} from 'react'
import { connect } from 'react-redux'
import {
    createAddedPersonAction,
    createAddedPersonAsyncAction
} from '../../redux/actions/person'

class Added extends Component {
    handleAdded = () => {
        let name = this.$elName.value;
        let age = this.$elAge.value;
        let id = new Date().getTime();
        this.props.addedPerson({ name, age, id });
    };
    handleAddedAsync = () => {
        let name = this.$elName.value;
        let age = this.$elAge.value;
        let id = new Date().getTime();
        this.props.addedPersonAsync({ name, age, id }, 1000);
    };
    render() {
        return (
            <ul>
                <li><input ref={e => this.$elName = e} type="text" placeholder='请输入姓名'/></li>
                <li><br/></li>
                <li><input ref={e => this.$elAge = e} type="text" placeholder='请输入年龄'/></li>
                <li><br/></li>
                <li>
                    <button onClick={this.handleAdded}>添加</button>
                    <button onClick={this.handleAddedAsync}>异步添加</button>
                </li>
            </ul>
        );
    }
}

export default connect(
    state => {},
    {
        addedPerson: createAddedPersonAction,
        addedPersonAsync: createAddedPersonAsyncAction,
    }
) (Added);
