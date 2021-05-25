
import React, {useContext, useState, useEffect} from 'react'

const appContext = {};

let state;
let reducer;
let listeners = [];

const setState = (newState) => {
    state = newState;
    listeners.map(fn => fn(state));
};

const store = {
    getState () {
        return state;
    },
    setState(newState) {

    },
    subscribe(fn) {
        listeners.push(fn);
        return () => {
            const index = listeners.indexOf(fn);
            listeners.splice(index, 1);
        };
    },
};

export const createStore = (_reducer, initState) => {
    state = initState;
    reducer = _reducer;
    return store;
};

const changed = (oldState, newState) => {

};

export const connect = (selector, dispatchSelector) => (Component) => {
    return (props) => {
        const {setState} = useContext(appContext);
        const dispatch = (action) => {
            setState(reducer(state, action));
        };

        const data = selector ? selector(state) : {state};
        const dispatchers = dispatchSelector ? dispatchSelector(dispatch) : {dispatch};

        const [, update] = useState({});
        useEffect(() => store.subscribe(() => {
            const newData = selector ? selector(state) : {state};
            if (changed(data, newData)) {
                update({});
            }
        }), [selector]);
        return <Component {...props} {...data} {...dispatchers}/>
    };
};
