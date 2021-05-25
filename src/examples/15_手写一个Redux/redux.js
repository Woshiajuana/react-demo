
import React, {useContext, useState, useEffect} from 'react'

const appContext = {};

let state;
let reducer;
let listeners = [];

const setState = (newState) => {
    state = newState;
    listeners.map(fn => fn(state));
};


const prevDispatch = (action) => {
    setState(reducer(state, action));
};

let dispatch = (action) => {
    if (action instanceof Function) {
        action(dispatch);
    } else {
        prevDispatch(action);
    }
};

const prevDispatch2 = dispatch;

dispatch = (action) => {
    if (action.payload instanceof Promise) {
        action.payload.then(data => {
            dispatch({...action, payload: data});
        }).catch(error => {
            dispatch({...action, payload: error, error: true });
            return Promise.reject(error);
        });
    } else {
        prevDispatch2(action);
    }
};

const store = {
    getState () {
        return state;
    },
    dispatch,
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
