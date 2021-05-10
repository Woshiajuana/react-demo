
import React, { Fragment, useImperativeHandle, forwardRef, useRef } from 'react'


const MyInput1 = forwardRef((props, ref) => {
    console.log(ref, props);
    return (
        <input type="text" placeholder="请输入"/>
    );
});

// const MyInput = (props, ref) => {
//     console.log(ref, props);
//     return (
//         <input type="text" placeholder="请输入"/>
//     );
// };

export default () => {

    const myInputRef = useRef(null);

    return (
        <Fragment>
            <MyInput1 ref={myInputRef}/>
        </Fragment>
    );
}
