import React from 'react'

// JSX
// const virtualDOM = (
//     <div>
//         A
//         <span>B1</span>
//         <span>B2</span>
//     </div>
// );
const style = { color: 'green', border: '1px solid red', margin: '5px' };
const virtualDOM = {
    type: 'div',
    key: 'A',
    props: {
        style,
        children: [
            { type: 'div', key: 'B1', props: { style, children: [] } },
            { type: 'div', key: 'B2', props: { style, children: [] } },
        ]
    }
};
const Placement = 'Placement';

// 开始工作循环
// 表示一个工作单元，表示正在处理中的 fiber
let workInProgress;
// 这个 Fiber 根节点
const TAG_ROOT = 'TAG_ROOT';
const TAG_HOST = 'TAG_HOST';

function workLoop() {
    while (workInProgress) {
        // 如果有任务就执行
        // 执行完成之后会返回下一个任务
        workInProgress = performUnitOfWork(workInProgress);
    }
}

const root = document.getElementById('root');

// Fiber 是一个普通的 JS 对象
let rootFiber = {
    tag: TAG_ROOT, // Fiber 的类型
    key: 'ROOT', // 唯一标签
    stateNode: root, // Fiber 对应的真实 DOM 节点
    props: {
        children: [virtualDOM]
    }
};

function performUnitOfWork (workInProgress) {
    beginWork(workInProgress);
    // 构建孩子
    if (workInProgress.child) {
        return workInProgress.child;
    }
    // 如果没有儿子，就开始构建弟弟
    while (workInProgress) {
        // 如果没有儿子 自己就结束了
        completeUnitOfWork(workInProgress);
        // 看看有没有弟弟
        if (workInProgress.sibling) {
            return workInProgress.sibling;
        }
        // 如果没有弟弟就找叔叔
        workInProgress = workInProgress.return;
    }
}

// fiber 在结束的时候，要去创建真实的 DOM 元素
function completeUnitOfWork(workInProgress) {
    console.log('completeUnitOfWork => ', workInProgress.key);
    let stateNode; // 真实 DOM
    switch (workInProgress.tag) {
        case TAG_HOST:
            stateNode = createStateNode(workInProgress);
            break;
    }
    // 在完成工作单元的时候要判断当前的 fiber 节点
    // makeEffectList(workInProgress)
}

// 副作用链，单链表
// 并不是包含所有的节点，而是包含有副作用的 fiber 节点
function makeEffectList(workInProgress) {

}

//
function createStateNode (fiber) {
    if (fiber.tag === TAG_HOST) {
        let stateNode = document.createElement(fiber.type);
        fiber.stateNode = stateNode;
    }
    return fiber.stateNode;
}

// 根据当前的 Fiber 和虚拟 DOM 构建 Fiber 树
function beginWork (workInProgress) {
    console.log('beginWork => ', workInProgress.key);
    const nextChildren = workInProgress.props.children;
    return reconcileChildren(workInProgress, nextChildren);
}

function reconcileChildren (returnFiber, nextChildren) {
    let previousNewFiber; // 上一个 Fiber 儿子
    let firstChildFiber; // 当前 returnFiber 的大儿子
    for (let i = 0; i < nextChildren.length; i++) {
        let newFiber = createFiber(nextChildren[i]);
        newFiber.flags = Placement; // 这是一个新节点，肯定是要插入到 DOM 去
        newFiber.return = returnFiber;
        if (!previousNewFiber) {
            firstChildFiber = newFiber;
        } else {
            previousNewFiber.sibling = newFiber;
        }
        previousNewFiber = newFiber;
    }
    returnFiber.child = firstChildFiber;
    return firstChildFiber
}

function createFiber (element) {
    return {
        tag: TAG_HOST,
        key: element.key,
        stateNode: element.type,
        props: element.props,
    }
}

// 当前正在执行的工作单元
workInProgress = rootFiber;
workLoop();



export default () => <div></div>
