
import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Route } from 'react-router-dom'
import Home from 'src/examples/Home'

const App = () => {
    return (
        <Route path="/" component={Home}/>
    );
};

ReactDOM.render(
    <React.StrictMode>
        <BrowserRouter>
            <App />
        </BrowserRouter>
    </React.StrictMode>
    , document.getElementById("root")
);

