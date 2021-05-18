
import { TAG_HOST, TAG_ROOT } from './constants'
import { scheduleRoot } from './schedule'

function render(element, container) {

    const rootFiber = {
        tag: TAG_ROOT,
        stateNode: container, // 一般情况下如果这个元素是一个原生节点的话，stateNode指向真实 DOM 元素
        props: {
            // props.children 是一个数组，里面放的是 React 元素 虚拟 DOM 后面会根据每个 React
            // 元素创建对应的 fiber
            children: [element]
        }
    };

    scheduleRoot(rootFiber);
}


const ReactDOM = {
    render,
};

export default ReactDOM;
