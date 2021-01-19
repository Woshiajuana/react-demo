import React, {Component} from 'react';

class Added extends Component {
    handleAdded = () => {
        let name = this.$elName.value;
        let age = this.$elAge.value;
        console.log(name, age);
    };
    render() {
        return (
            <ul>
                <li><input ref={e => this.$elName = e} type="text" placeholder='请输入姓名'/></li>
                <li><br/></li>
                <li><input ref={e => this.$elAge = e} type="text" placeholder='请输入年龄'/></li>
                <li><br/></li>
                <li><button onClick={this.handleAdded}>添加</button></li>
            </ul>
        );
    }
}

export default Added;
