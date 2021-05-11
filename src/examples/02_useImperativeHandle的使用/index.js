
import React, { Fragment, useImperativeHandle, forwardRef, useRef } from 'react'

const MyInput = forwardRef((props, ref) => {
    const inputRef = useRef(null);
    useImperativeHandle(ref, () => inputRef.current, []);
    return (
        <input ref={inputRef} type="text" placeholder="请输入"/>
    );
});

export default () => {
    const myInputRef = useRef(null);
    return (
        <Fragment>
            <MyInput ref={myInputRef}/>
            <br/>
            <br/>
            <button onClick={() => myInputRef.current.focus()}>点我聚焦输入框</button>
        </Fragment>
    );
}
