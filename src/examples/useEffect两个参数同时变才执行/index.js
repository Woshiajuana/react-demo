import React, {Component} from 'react'


class Home extends Component {
    render() {
        return (
            <div>
                <p>共有：{this.props.count} 人</p>
            </div>
        );
    }
}

export default Home;
