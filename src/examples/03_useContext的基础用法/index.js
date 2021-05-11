
import React, { useContext } from 'react'
import HelloContext from './HelloContext'

const Child = () => {
    const value = useContext(HelloContext);
    // return (
        {/*<HelloContext.Consumer>*/}
            // { value => <div>{value}</div> }
        // </HelloContext.Consumer>
    // );
    return <div>{value}</div>;
};

const Parent = () => {
    return <Child/>
};

export default () => {
    return (
        <HelloContext.Provider value="hello world">
            <Parent/>
        </HelloContext.Provider>
    );
};
