
import React, { useContext } from 'react'
import { RouterContext } from './Router'

export default function Route ({ path, component }) {
    const { location } = useContext(RouterContext);
    const { pathname } = location;
    if (decodeURIComponent(pathname).match(path)) {
        return React.createElement(component);
    }
    return null;
}
