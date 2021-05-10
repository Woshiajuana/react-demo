
import React, { Fragment } from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter, Route, Switch, Redirect, Link } from 'react-router-dom'

const examples = (s =>
    s.keys().map(k => ({ key: k.split('/')[1], value: s(k).default }))
) (require.context('src/examples', true, /index\.js$/));

const Home = () => {
    return (
        <ul>
            { examples.map(({ key }) => <li key={key}><Link to={`/${key}`}>{key}</Link></li>) }
        </ul>
    );
};

const App = () => {
    return (
        <Fragment>
            <Link to="/">回首页</Link>
            <Switch>
                { examples.map(({ key, value }) => <Route key={key} path={`/${key}`} component={value}/>) }
                <Route path="/" component={Home} exact/>
                <Redirect to="/" exact/>
            </Switch>
        </Fragment>
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

