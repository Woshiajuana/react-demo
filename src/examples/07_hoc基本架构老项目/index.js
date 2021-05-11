
import React from 'react'

const withRequest = ({ url }) => Target => {
    return class Proxy extends React.Component {
        constructor () {
            super ();
            this.state = { users: null };
        }

        componentDidMount() {
            setTimeout(() => {
                // fetch(url)
                this.setState({
                    users: ['小明', '小王'],
                });
            }, 2000);
        }

        render () {
            const { users } = this.state;
            return <Target users={users}/>
        }
    }
};

export default withRequest({
    url: '...'
})(props => {
    if (props.users === null) {
        return <div>loading...</div>;
    }
    return <ul>{props.users.map((item, index) => <li key={index}>{item}</li>)}</ul>
})
