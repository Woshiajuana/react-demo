
import React from 'react'

function sleep (delay) {
    for (let ts = Date.now(); Date.now() - ts <= delay;) {}
}

const works = [
    () => {
        console.log('任务1 start');
        sleep(0);
        console.log('任务1 end');
    },
    () => {
        console.log('任务2 start');
        sleep(0);
        console.log('任务2 end');
    },
    () => {
        console.log('任务3 start');
        sleep(0);
        console.log('任务3 end');
    },
];

// requestIdleCallback(workLoop);

function workLoop(deadline) {
    console.log(`本帧的剩余时间是（${parseInt(deadline.timeRemaining())}）`);
    while ((deadline.timeRemaining() > 1) && works.length > 0) {
        performUnitOfWork();
    }
    if (works.length > 0) {
        requestIdleCallback(workLoop);
    }
}

function performUnitOfWork() {
    works.shift()();
}

export default () => {

    return (
        <div>
            <h2>测试任务切片</h2>
        </div>
    );
}
