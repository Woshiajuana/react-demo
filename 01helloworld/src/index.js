import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { createStore } from 'redux'
import { Provider, connect } from 'react-redux'

const reducer = function(state = { num: 0 }, action) {
    switch (action.type) {
        case 'add':
            state.num++;
            break;
        case 'decrement':
            state.num--;
            break;
        default:
            break;
    }
    return {...state};
};
const store = createStore(reducer);
class CountNumberComponent extends React.Component {
    render () {
        console.log(this.props);
        return (
            <div>
                <h1>当前数值：{this.props.num}</h1>
                <div>
                    <button onClick={this.props.add}>+1</button>
                    <button onClick={this.props.decrement}>-1</button>
                </div>
            </div>
        )
    }
}
const App = connect(
    (state) => ({
        num: state.num,
    }),
    (dispatch) => ({
        add: () => {
            console.log('dispatch', dispatch);
            dispatch({ type: 'add' })
        },
        decrement: () => dispatch({ type: 'decrement' }),
    }),
)(CountNumberComponent);
ReactDOM.render(
    <Provider store={store}>
        <App/>
    </Provider>,
    document.getElementById('root'),
);
