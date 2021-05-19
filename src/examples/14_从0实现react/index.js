
import React from './react'
import ReactDOM from './react-dom'

const style = { border: `3px solid red`, margin: `5px` };

// const element1 = (
    {/*<div id="A1" style={style}>*/}
    {/*    <div id="B1" style={style}>*/}
    {/*        <div id="C1" style={style}>C1</div>*/}
    {/*        <div id="C2" style={style}>C2</div>*/}
        // </div>
        {/*<div id="B2" style={style}/>*/}
    // </div>
// );

const element = React.createElement("div", {
    id: "A1",
    style: style
}, /*#__PURE__*/React.createElement("div", {
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
}));

console.log(element);

setTimeout(() => {
    // document.getElementById('root').appendChild()
    ReactDOM.render(element, document.getElementById('root'));
}, 200);
