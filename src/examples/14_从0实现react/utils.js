
export function setProps (dom, oldProps, newProps) {
    for (let k in oldProps) {}
    for (let k in newProps) {
        if (k !== 'children') {
            setProp(dom, k, newProps[k]);
        }
    }
}

function setProp(dom, key, value) {
    if (/^on/.test(key)) {
        // 没有使用合成事件
        dom[key.toLowerCase()] = value;
    } else if (key === 'style') {
        if (value) {
            for(let styleName in value) {
                dom.style[styleName] = value[styleName];
            }
        }
    } else {
        dom.setAttribute(key, value);
    }
}
