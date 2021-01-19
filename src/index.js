
import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter } from 'react-router-dom'
import { Provider } from 'react-redux'

import App from './App'
import store from './redux/store'

ReactDOM.render(
    // 此处需要用 Provider 包裹 App，目的是让 App 所有的后代容器组件都能接收到 store
    <Provider store={store}>
        <BrowserRouter>
            <App/>
        </BrowserRouter>
    </Provider>
    , document.getElementById('root')
);
