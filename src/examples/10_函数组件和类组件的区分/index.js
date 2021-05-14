
import React, { Component, Fragment, PureComponent } from 'react'


// PureComponent 浅比较
// immutable.js  or immer 深比较

// react 怎么实现 keep-alive ?   react-keeper

class ClassComponent extends Component {
    constructor(props) {
        super(props)
    }
    render () {
        return <p>我是类组件</p>
    }
}

function FunctionComponent () {
    return <p>我是函数组件</p>
}

console.log('ClassComponent => ', typeof ClassComponent, ClassComponent.prototype.isReactComponent);
console.log('FunctionComponent => ', typeof FunctionComponent, FunctionComponent.prototype.isReactComponent);


console.log('ClassComponent.prototype => ', ClassComponent.prototype);
console.log('FunctionComponent.prototype => ', FunctionComponent.prototype);


export default () => {
    return (
        <Fragment>
            <ClassComponent/>
            <FunctionComponent/>
        </Fragment>
    );
}
