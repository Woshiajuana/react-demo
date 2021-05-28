
import React, { useState, useEffect } from 'react'
import { createBrowserHistory } from 'history'

const history = createBrowserHistory();

export const RouterContext = React.createContext(null);

export default function Router ({ children }) {
    const [location, setLocation] = useState(window.location);
    useEffect(() => {
        const unlisten = history.listen(({location}) => {
            setLocation(location);
        });
        return () => unlisten && unlisten();
    }, []);
    return <RouterContext.Provider value={{ history, location }}>{children}</RouterContext.Provider>
}
