import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { HashRouter as Router, Route, Link } from 'react-router-dom'
import { createStore } from 'redux'

// ReactDOM.render(
//   <React.StrictMode>
//     <App />
//   </React.StrictMode>,
//   document.getElementById('root')
// );

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

// react 函数式组件
function Clock1(props) {
    return (
        <div>
            <h1>现在的时间是{props.date.toLocaleTimeString()}</h1>
            <h2>这是副标题</h2>
        </div>
    )
}
let exampleStyle = {
    background: 'blue',
    borderBottom: '1px solid red',
};

let arrClassName = ['bg', 'fontsize'];

let element = (
    <div>
        {/*这里写注释*/}
        <h1 className={arrClassName.join(' ')} style={exampleStyle}>hello world</h1>
    </div>
);


function ChildDom (props) {
    return (
        <div>
            <h1>hello world</h1>
        </div>
    );
}

class HelloWorld extends React.Component {
    render() {
        return (
            <div>
                <h1>hello world</h1>
            </div>
        );
    }
}


class Clock extends React.Component {
    constructor (props) {
        super(props);
        // 构造函数初始化数据
        this.state = {
            time: new Date().toLocaleTimeString(),
        }
    }
    render() {
        return (
            <div>
                <p>当前时间：{this.state.time}</p>
            </div>
        );
    }
    // 生命周期函数，组件渲染完成的函数
    componentDidMount() {
        setInterval(() => {
            // 修改数据，不要直接修改数据
            this.setState({
                time: new Date().toLocaleTimeString(),
            });
        }, 1000);
    }
}


class TabSwitch extends React.Component {
    constructor (props) {
        super(props);
        this.state = {
            index: 0,
        }
    }
    onClick (index) {
        this.setState({ index });
    }
    render () {
        return (
            <div>
                <div>
                    <button onClick={() => this.onClick(0)}>按钮1</button>
                    <button onClick={() => this.onClick(1)}>按钮2</button>
                </div>
                {
                    this.state.index === 0 ? <div>内容1</div> : <div>内容2</div>
                }
            </div>
        );
    }
}


class ParentComponent extends React.Component {
    constructor (props) {
        super (props);
        this.state = {
            text: '',
        }
    }
    onText (e) {
        this.setState({ text: e });
    }
    render () {
        return (
            <div>
                <p>从子组件接收到的参数：{this.state.text}</p>
                <ChildComponent onText={ (e) => this.onText(e) } />
            </div>
        )
    }
}

class ChildComponent extends React.Component {
    constructor (props) {
        super (props);
    }
    onClick () {
        this.props.onText('hello world');
    }
    render () {
        return (
            <div>
                <button onClick={ () => this.onClick() }>给父组件传递参数</button>
            </div>
        )
    }
}


class ListComponent extends React.Component {
    constructor (props) {
        super(props);
        this.state = {
            arr: [ 'a', 'b', 'c', 'd' ]
        }
    }
    render () {
        return (
            <ul>{this.state.arr.map((item, index) => <li key={index}>{item}</li>)}</ul>
        );
    }
}

class Lifecycle extends React.Component {
    constructor (props) {
        super(props);
    }
    // 组件将要挂载渲染
    componentWillMount() {

    }
    // 组件渲染完毕
    componentDidMount() {

    }
    // 组件将要接收 props 数据
    componentWillReceiveProps(nextProps, nextContext) {

    }
    // 组件接收到新的 state 或者 props ，判断是否更新，返回布尔值
    shouldComponentUpdate(nextProps, nextState, nextContext) {

    }
    // 组件将要更新
    componentWillUpdate(nextProps, nextState, nextContext) {

    }
    // 组件已经更新
    componentDidUpdate(prevProps, prevState, snapshot) {

    }
    // 组件将要卸载
    componentWillUnmount(){

    }
    // 渲染
    render () {
        return null
    }
}


function Home(props) {
    console.log(props);
    return (
        <h1>我是首页内容</h1>
    );
}
function List(props) {
    console.log(props);
    return (
        <h1>我是列表内容</h1>
    );
}
function Details(props) {
    console.log(props);
    return (
        <h1>我是详情内容</h1>
    );
}
class RouterComponent extends React.Component {
    constructor (props) {
        super(props);
    }
    render () {
        return (
            <Router>
                <nav>
                    <Link to='/'>首页</Link>
                    <Link to={ { pathname: 'list', query: { to: 1 } } }>列表页</Link>
                    <Link to='/details'>详情页</Link>
                </nav>
                <Route path='/' exact component={Home}/>
                <Route path='/list' exact component={List}/>
                <Route path='/details' exact component={Details}/>
            </Router>
        );
    }
}


const reducer = function(state = { num: 0 }, action) {
    switch (action.type) {
        case 'add':
            state.num++;
            break;
        case 'decrement':
            state.num--;
            break;
        default:
            break;
    }
    return state;
};
const store = createStore(reducer);
class CountNumberComponent extends React.Component {
    render () {
        return (
            <div>
                <h1>当前数值：{store.getState().num}</h1>
                <div>
                    <button onClick={() => store.dispatch({ type: 'add' })}>+1</button>
                    <button onClick={() => store.dispatch({ type: 'decrement' })}>-1</button>
                </div>
            </div>
        )
    }
}
store.subscribe(() => {
    ReactDOM.render(
        <CountNumberComponent/>,
        document.getElementById('root'),
    );
});
ReactDOM.render(
    <CountNumberComponent/>,
    document.getElementById('root'),
);
