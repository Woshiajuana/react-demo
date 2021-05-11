
import React, { useEffect, useState, Fragment } from 'react'

export default () => {

    const [count, setCount] = useState(0);
    const [display, setDisplay] = useState(false);

    // 错误，递归
    // if (count > 1) {
    //     setDisplay(_ => true);
    // }

    // render more hooks than previous render
    // react 在执行的时候，回去统计一个组件里面的 hooks 个数，当发现同一个组件两次执行的 hooks 个数不一致，就会报错
    // if (count > 1) {
    //     useEffect(() => {
    //         setDisplay(_ => true);
    //     }, []);
    // }

    // 这样虽然是解决了报错，但是 react 并不知道 useEffect 当 count 大于1的时候已经被替换，它会认为这个位置的
    // useEffect 已经被执行过了，而且他的依赖项没有改变，就不会再次执行。
    // if (count > 1) {
    //     useEffect(() => {
    //         setDisplay(_ => true);
    //     }, []);
    // } else {
    //     useEffect(() => {
    //         setDisplay(_ => false);
    //     }, []);
    // }

    useEffect(() => {
        if (count > 1) {
            setDisplay(_ => true);
        }
    }, [count > 1]);

    return (
        <Fragment>
            <h1>当 count 大于1的时候 显示 hello world</h1>
            <br/>
            <p>count => {count}</p>
            <button onClick={() => setCount(x => x + 1)}>+1</button>
            { display && <p>hello world</p> }
        </Fragment>
    );

}
