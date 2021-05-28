
import React, { useContext } from 'react'
import { RouterContext } from './Router'

export default function Switch ({ children }) {
    const { location } = useContext(RouterContext);
    const { pathname }  = location;
    children = Array.isArray(children) ? children : [children];
    children = children.flat();
    for (let i = 0, len = children.length; i < len; i++) {
        const child = children[i];
        if (decodeURIComponent(pathname).match(child.props.path)) {
            return child;
        }
    }
    return null;
}
