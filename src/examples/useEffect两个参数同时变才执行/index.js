
import React, { Fragment, useEffect, useRef, useState } from 'react'

export default () => {

    const [x, setX] = useState(0);
    const [y, setY] = useState(0);
    const [count, setCount] = useState(x + y);
    const xyRef = useRef({ x, y});

    useEffect(() => {
        const { x: prevX, y: prevY } = xyRef.current;
        if (x !== prevX && y !== prevY) {
            // 更新
            setCount(x + y);
        }
        xyRef.current = { x, y };
    }, [x, y]);

    return (
        <Fragment>
            <p>x、y同时改变才计算两者的和</p>
            <p>x => {x} <button onClick={() => setX(x => x + 1)}>x+1</button></p>
            <p>y => {y} <button onClick={() => setY(y => y + 1)}>y+1</button></p>
            <p>和 => {x} + {y} = {count} <button onClick={() => { setX(x => x + 1); setY(y => y + 1); }}>x+1&y+1</button></p>
        </Fragment>
    );
}
