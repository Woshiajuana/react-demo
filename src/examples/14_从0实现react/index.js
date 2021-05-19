
import React from './react'
import ReactDOM from './react-dom'

const style = { border: `3px solid red`, margin: `5px` };

const element1 = (
    <div id="A1" style={style}>
        A1
        <div id="B1" style={style}>
            <div id="C1" style={style}>C1</div>
            <div id="C2" style={style}>C2</div>
         </div>
        <div id="B2" style={style}>B2</div>
    </div>
);

const e2 = (
    <div id="A1" style={style}>
        A1
        <div id="B1" style={style}>
            <div id="C1" style={style}>C1</div>
        </div>
        <div id="B2" style={style}>
            B2
            <div id="D1" style={style}>D1</div>
            <div id="D2" style={style}>D2</div>
        </div>
    </div>
);

const element = React.createElement("div", {
    id: "A1",
    style: style
}, "A1", /*#__PURE__*/React.createElement("div", {
    id: "B1",
    style: style
}, /*#__PURE__*/React.createElement("div", {
    id: "C1",
    style: style
}, "C1"), /*#__PURE__*/React.createElement("div", {
    id: "C2",
    style: style
}, "C2")), /*#__PURE__*/React.createElement("div", {
    id: "B2",
    style: style
}, "B2"));

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

setTimeout(() => {
    // document.getElementById('root').appendChild()
    ReactDOM.render(element, document.getElementById('root'));
    document.getElementById('root').addEventListener('click', () => {
        ReactDOM.render(element2, document.getElementById('root'));
    });
}, 200);
