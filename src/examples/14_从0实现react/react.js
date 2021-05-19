
import { ELEMENT_TEXT } from './constants'
import { UpdateQueue, Update } from './UpdateQueue'
import { scheduleRoot } from './schedule'

// 创建元素 虚拟 DOM
function createElement(type, config, ...children) {
    if (config){
        delete config.__self;
        delete config.__source;
    }
    return {
        type,
        props: {
            ...config,
            children: children.map(child => {
                return typeof child === 'object' ? child : {
                    type: ELEMENT_TEXT,
                    props: {
                        text: child,
                        children: []
                    }
                }
            })
        }
    };
}


class Component {
    constructor (props) {
        this.props = props;
        this.updateQueue = new UpdateQueue();
    }
    setState(payload) {
        // 可能是对象 也可能是一个函数
        let update = new Update(payload);
        // updateQueue 其实是放在此类组件对应的 fiber 节点的 internalFiber 上
        this.internalFiber.updateQueue.enqueueUpdate(update);
        // this.updateQueue.enqueueUpdate(update);
        // 从根节点开始调度
        scheduleRoot();
    }
}

// 有这个属性就是类组件
Component.prototype.isReactComponent = {};


const React = {
    createElement,
    Component,
};

export default React;
