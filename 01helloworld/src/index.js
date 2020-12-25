import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

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


ReactDOM.render(
    <ListComponent />,
    document.getElementById('root'),
);
