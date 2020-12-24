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
    // 生命周期函数，组件渲染完成时的函数
    componentDidMount(): void {
        setInterval(() => {
            this.state.time = new Date().toLocaleTimeString();
        }, 1000);
    }
}



ReactDOM.render(
    <Clock />,
    document.getElementById('root'),
);
