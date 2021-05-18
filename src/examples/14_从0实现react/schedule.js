

// 从根节点开始渲染和调度
// diff 阶段
// render 阶段 此阶段可以暂停

let nextUnitOfWork = null;
let workInProgressRoot = null; // RootFiber 应用的根

function scheduleRoot(rootFiber) {
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

//
function performUnitOfWork(nextUnitOfWork) {

}

// react 告诉浏览器  我现在有任务
requestIdleCallback(workLoop, { timeout: 500 });
