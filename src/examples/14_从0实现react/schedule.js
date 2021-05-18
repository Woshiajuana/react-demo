

// 从根节点开始渲染和调度
// diff 阶段
// render 阶段 此阶段可以暂停

import { TAG_ROOT, ELEMENT_TEXT, TAG_HOST, TAG_TEXT, PLACEMENT, UPDATE, DELETION } from "./constants";

let nextUnitOfWork = null;
let workInProgressRoot = null; // RootFiber 应用的根

function scheduleRoot(rootFiber) {
    workInProgressRoot = rootFiber;
    nextUnitOfWork = rootFiber;
}

// 循环执行工作
function workLoop(deadline) {
    let shouldYield = false; // 是否要让出时间切片或者说控制权
    while (nextUnitOfWork && !shouldYield) {
        nextUnitOfWork = performUnitOfWork(nextUnitOfWork);
        shouldYield = deadline.timeRemaining() < 1; // 没有时间;
    }
    if (!nextUnitOfWork) {
        console.log('render 阶段结束');
    }
    // 不管有没有任务 都请求再次调度
    requestIdleCallback(workLoop, { timeout: 500 });
}

// 开始单元工作
function performUnitOfWork(currentFiber) {
    beginWork(currentFiber);
}

// 开始工作
function beginWork(currentFiber) {
    if (currentFiber.tag === TAG_ROOT) {
        updateHostRoot(currentFiber);
    }
}

function updateHostRoot(currentFiber) {
    // [element]
    // 1. 先处理自己，如果是一个原生节点 创建真实 DOM
    // 2. 创建子 fiber
    let newChildren = currentFiber.props.children;
    reconcileChildren(currentFiber, newChildren);
}

function reconcileChildren(currentFiber, newChildren) {
    let newChildIndex = 0; // 新子节点的索引
    let prevSibling; // 上一个新的子 fiber
    while (newChildIndex < newChildren.length) {
        // 取出虚拟 DOM 节点
        let newChild = newChildren[newChildIndex];
        let tag;
        if (newChild.type === ELEMENT_TEXT) {
            tag = TAG_TEXT; // 这是一个文本
        } else if (typeof newChild.type === 'string')  {
            tag = TAG_HOST; // 如果 type 是字符串代表是原生节点
        }
        let newFiber = {
            tag,
            type: newChild.type,
            props: newChild.props,
            stateNode: null,
            return: currentFiber, // 父Fiber
            effectTag: PLACEMENT, // 副作用标识
            nextEffect: null, // effectlist 也是一个单链表
        };
        newChildIndex++;
    }
}

// react 告诉浏览器  我现在有任务
requestIdleCallback(workLoop, { timeout: 500 });
