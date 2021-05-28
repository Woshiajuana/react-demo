
import React from 'react'
import { Provider, connect } from './redux'
import store from './store'

const style = { border: `3px solid red`, padding: `40px`, margin: '10px' };

const OneChild = () => {
    console.log('大儿子渲染了');
    return (
        <div style={style}>
            <h2>大儿子</h2>
            <OneGrandson/>
        </div>
    );
};

const OneGrandson = connect(
    ({ parentToOneGrandson }) => ({ parentToOneGrandson }),
    dispatch => ({
        onOneGrandsonToThreeChild: event => dispatch({ type: 'ONE_GRANDSON_TO_THREE_CHILD', data: event.target.value }),
        onOneGrandsonToParent: event => dispatch({ type: 'ONE_GRANDSON_TO_PARENT', data: event.target.value }),
    })
)(({parentToOneGrandson, onOneGrandsonToThreeChild, onOneGrandsonToParent}) => {
    console.log('大孙子渲染了');
    return (
        <div style={style}>
            <h2>大孙子</h2>
            <ul>
                <li>跟爷爷聊天 <input type="text" onChange={onOneGrandsonToParent}/> 收到爷爷的回话: {parentToOneGrandson}</li>
                <li>跟小叔聊天 <input type="text" onChange={onOneGrandsonToThreeChild}/></li>
            </ul>
        </div>
    );
});

const TwoChild = () => {
    console.log('二儿子渲染了');
    return (
        <div style={style}>
            <h2>二儿子</h2>
        </div>
    );
};

const ThreeChild = connect(
    ({ oneGrandsonToThreeChild }) => ({ oneGrandsonToThreeChild })
)(({ oneGrandsonToThreeChild }) => {
    console.log('小儿子渲染了');
    return (
        <div style={style}>
            <h2>小儿子</h2>
            <ul>
                <li>收到大侄子的回话: {oneGrandsonToThreeChild}</li>
            </ul>
        </div>
    );
});

const Parent = connect(
    ({ oneGrandsonToParent }) => ({ oneGrandsonToParent }),
    dispatch => ({
        onParentToOneGrandson: event => dispatch({ type: 'PARENT_TO_ONE_GRANDSON', data: event.target.value }),
    })
)(({ oneGrandsonToParent, onParentToOneGrandson }) => {
    console.log('父元素渲染了');
    return (
        <div style={style}>
            <h2>父元素</h2>
            <ul>
                <li>跟大孙子聊天 <input onChange={onParentToOneGrandson} type="text"/> 收到大孙子的回话: {oneGrandsonToParent}</li>
            </ul>
            <OneChild/>
            <TwoChild/>
            <ThreeChild/>
        </div>
    );
});

export default () => {
    return (
        <Provider store={store}>
            <Parent/>
        </Provider>
    );
};
