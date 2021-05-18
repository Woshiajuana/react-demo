
export function setProps (dom, oldProps, newProps) {
    for (let k in oldProps) {}
    for (let k in newProps) {
        if (k !== 'children') {
            setProp(dom, k, newProps[k]);
        }
    }
}

function setProp(dom, key, value) {

}
