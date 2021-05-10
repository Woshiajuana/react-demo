
import React, { useState, Fragment } from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Route, Link, useParams } from 'react-router-dom'

// import App from "./App";


const App = React.memo(() => {
    return (
        <Route path="/" component={Home}/>
    );
});


const Home = React.memo(() => {
    const [count, setCount] = useState(1);
    // const params = useParams();
    console.log('Home count => ', count);
    return (
        <Fragment>
            <Link to="/ha">跳转跳转</Link>
            <p>App count => {count}</p>
            <button onClick={() => setCount(count + 2)}>+ 2</button>
            {/*<CountDown count={count} onAdded={() => setCount((c) => c + 1)}/>*/}
            <CountDown count={count} onAdded={() => setCount(count + 1)}/>
        </Fragment>
    );
}, () => true);

const CountDown = React.memo((props) => {

    const { count, onAdded } = props;

    console.log('CountDown count => ', count);

    return (
        <Fragment>
            <Link to="/ha">跳转跳转跳转跳转跳转跳转跳转跳转</Link>
            <p>count => {count}</p>
            <button onClick={onAdded}>+ 1</button>
        </Fragment>
    );

}, () => {
    return true;
});


ReactDOM.render(
    <React.StrictMode>
        <BrowserRouter>
            <App />
        </BrowserRouter>
    </React.StrictMode>
    , document.getElementById("root")
);

