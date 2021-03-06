
import React from './react'
import ReactDOM from './react-dom'
const style = { border: `3px solid red`, margin: `5px` };

// const element1 = React.createElement("div", {
//     id: "counter"
// }, /*#__PURE__*/React.createElement("span", null, (void 0).state.number), /*#__PURE__*/React.createElement("button", {
//     onClick: (void 0).onClick
// }, "+1"));

// const e = (
//     <div id="counter">
//         <span>{this.state.number}</span>
//         <button onClick={this.onClick}>+1</button>
//      </div>
// );

class ClassCounter extends React.Component {
    constructor(props) {
        super(props);
        this.state = { number: 0 };
    }
    onClick = () => {
        this.setState(state => ({ number: state.number + 1}));
    };
    render () {
        return React.createElement("div", {
            id: "counter"
        }, /*#__PURE__*/React.createElement("span", null, this.state.number), /*#__PURE__*/React.createElement("button", {
            onClick: this.onClick
        }, "+1"));
    }
}


const element2 = React.createElement("div", {
    id: "A1",
    style: style
}, "A1", /*#__PURE__*/React.createElement("div", {
    id: "B1",
    style: style
}, /*#__PURE__*/React.createElement("div", {
    id: "C1",
    style: style
}, "C1")), /*#__PURE__*/React.createElement("div", {
    id: "B2",
    style: style
}, "B2", /*#__PURE__*/React.createElement("div", {
    id: "D1",
    style: style
}, "D1"), /*#__PURE__*/React.createElement("div", {
    id: "D2",
    style: style
}, "D2")));


const element = React.createElement(FunctionCounter, null);


function reducer(state, action) {
    switch (action.type) {
        case 'ADD':
            return { count: state.count + 1 };
        default:
            return state;
    }
}

function f() {
    const [ state, dispatch ] = React.userReducer(reducer, { count: 0 });
    const [ state1, dispatch1 ] = React.userReducer(reducer, { count: 0 });
    return (
        <div>
            <p>{state.count}</p>
            <p>{state1.count}</p>
            <button onClick={() => dispatch({ type: 'ADD'}) }>+1</button>
            <button onClick={() => dispatch1({ type: 'ADD'}) }>+1</button>
        </div>
    );
}

function FunctionCounter (props) {
    const [ state, dispatch ] = React.userReducer(reducer, { count: 0 });
    const [ state1, dispatch1 ] = React.userReducer(reducer, { count: 0 });
    return React.createElement("div", null, /*#__PURE__*/React.createElement("p", null, state.count), /*#__PURE__*/React.createElement("p", null, state1.count), /*#__PURE__*/React.createElement("button", {
        onClick: () => dispatch({
            type: 'ADD'
        })
    }, "+1"), /*#__PURE__*/React.createElement("button", {
        onClick: () => dispatch1({
            type: 'ADD'
        })
    }, "+1"));
}

setTimeout(() => {
    // document.getElementById('root').appendChild()
    // ReactDOM.render(element, document.getElementById('root'));
}, 200);
