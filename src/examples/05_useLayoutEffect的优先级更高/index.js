
import React, { useState, useEffect, useLayoutEffect, Fragment } from 'react'

// useLayoutEffect 比 useEffect 的优先级更高

export default () => {

    const [count, setCount] = useState(0);

    useEffect(() => {
        console.log(`effect => ${Date.now()}`);
    }, [count]);

    useLayoutEffect(() => {
        console.log(`layout => ${Date.now()}`);
    }, [count]);

    useEffect(() => {
        const timer = setInterval(() => setCount(x => x + 1), 1000);
        return () => clearInterval(timer);
    }, []);

    return (
        <Fragment>
            { count }
        </Fragment>
    );
}
