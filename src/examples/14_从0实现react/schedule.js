

// 从根节点开始渲染和调度
// diff 阶段
// render 阶段 此阶段可以暂停

import { TAG_ROOT, ELEMENT_TEXT, TAG_HOST, TAG_TEXT, PLACEMENT, UPDATE, DELETION } from './constants'
import { setProps } from './utils'

let nextUnitOfWork = null;
let workInProgressRoot = null; // RootFiber 应用的根

export function scheduleRoot(rootFiber) {
    console.log('rootFiber => ', rootFiber);
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
    if (!nextUnitOfWork && workInProgressRoot) {
        console.log('render 阶段结束');
        // 提交阶段
        console.log('workInProgressRoot => ', workInProgressRoot);
        commitRoot();
    }
    // 不管有没有任务 都请求再次调度
    requestIdleCallback(workLoop, { timeout: 500 });
}

// 提交阶段
function commitRoot() {
    let currentFiber = workInProgressRoot.firstEffect;
    while (currentFiber) {
        commitWork(currentFiber);
        currentFiber = currentFiber.nextEffect;
    }
    workInProgressRoot = null;
}

function commitWork(currentFiber) {
    if (!currentFiber) return;
    let returnFiber = currentFiber.return;
    let returnDOM = returnFiber.stateNode;
    console.log('currentFiber => ', currentFiber);
    if (currentFiber.effectTag === PLACEMENT) {
        returnDOM.appendChild(currentFiber.stateNode);
    }
    currentFiber.effectTag = null;
}

// 开始单元工作
function performUnitOfWork(currentFiber) {
    beginWork(currentFiber);
    if (currentFiber.child) {
        return currentFiber.child;
    }
    // 如果没有儿子，就开始构建弟弟
    while (currentFiber) {
        // 如果没有儿子 自己就结束了
        completeUnitOfWork(currentFiber);
        // 看看有没有弟弟
        if (currentFiber.sibling) {
            return currentFiber.sibling;
        }
        // 如果没有弟弟就找叔叔
        currentFiber = currentFiber.return;
    }
}

// 在完成的时候要收集有副作用的 fiber 然后组成 effect list
function completeUnitOfWork(currentFiber) {
    let returnFiber = currentFiber.return;
    if (returnFiber) {
        // 把自己儿子的 effect 链挂到父亲身上
        if (!returnFiber.firstEffect) {
            returnFiber.firstEffect = currentFiber.firstEffect;
        }
        if (currentFiber.lastEffect) {
            if (returnFiber.lastEffect) {
                returnFiber.lastEffect.nextEffect = currentFiber.firstEffect;
            }
            returnFiber.lastEffect = currentFiber.lastEffect;
        }
        // 把自己挂到 effect  链上
        const effectTag = currentFiber.effectTag;
        if (effectTag) {
            // 自己有副作用
            if (returnFiber.lastEffect) {
                returnFiber.lastEffect.nextEffect = currentFiber;
            } else {
                returnFiber.firstEffect = currentFiber;
            }
            returnFiber.lastEffect = currentFiber;
        }
    }
}

// 开始工作
function beginWork(currentFiber) {
    if (currentFiber.tag === TAG_ROOT) {
        updateHostRoot(currentFiber);
    } else if (currentFiber.tag === TAG_TEXT) {
        updateHostText(currentFiber);
    } else if (currentFiber.tag === TAG_HOST) {
        updateHost(currentFiber);
    }
}

function updateHost(currentFiber) {
    if (!currentFiber.stateNode) {
        currentFiber.stateNode = createDOM(currentFiber);
    }
    const newChildren = currentFiber.props.children;
    reconcileChildren(currentFiber, newChildren);
}

function updateHostText(currentFiber) {
    if (!currentFiber.stateNode) {
        currentFiber.stateNode = createDOM(currentFiber);
    }
}

function createDOM(currentFiber) {
    if (currentFiber.tag === TAG_TEXT) {
        return document.createTextNode(currentFiber.props.text);
    } else if (currentFiber.tag === TAG_HOST) {
        const stateNode = document.createElement(currentFiber.type);
        updateDOM(stateNode, {}, currentFiber.props);
        return stateNode;
    }
}

function updateDOM(stateNode, oldProps, newProps) {
    setProps(stateNode, oldProps, newProps);
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
        if (newChildIndex === 0) {
            // 太子
            currentFiber.child = newFiber;
        } else {
            prevSibling.sibling = newFiber;
        }
        prevSibling = newFiber;
        newChildIndex++;
    }
}

// react 告诉浏览器  我现在有任务
requestIdleCallback(workLoop, { timeout: 500 });
