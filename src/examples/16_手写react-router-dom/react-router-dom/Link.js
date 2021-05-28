
import React, { useContext } from 'react'
import { RouterContext } from './Router'

export default function Link ({ to, children, ...otherProps }) {
    const { history } = useContext(RouterContext);
    return (
        <a
            {...otherProps}
            href={to}
            onClick={e => {
                e.preventDefault();
                history.push(to);
            }}
        >{children}</a>
    )
}
