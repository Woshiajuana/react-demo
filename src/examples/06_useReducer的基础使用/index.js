
import React, { Fragment, useReducer } from 'react'

const initialValue = { count: 0 };

function reducer(state, action) {
    switch (action.type) {
        case 'increment':
            return {count: state.count + 1};
        case 'decrement':
            return {count: state.count - 1};
        default:
            throw new Error();
    }
}

export default () => {

    const [state, dispatch] = useReducer(reducer, initialValue);

    return (
        <Fragment>
            <p>count => {state.count}</p>
            <br/>
            <button onClick={() => dispatch({ type: 'increment' })}>+1</button>
            <br/>
            <button onClick={() => dispatch({ type: 'decrement' })}>-1</button>
        </Fragment>
    );
}
