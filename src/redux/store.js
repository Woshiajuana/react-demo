
// 引入 createStore 专门用于创建 redux 中最为核心的 store 对象
import { createStore, applyMiddleware } from 'redux'
// 引入 redux-thunk，用于支持异步 action
import thunk from 'redux-thunk'
// 引入 redux-devtools-extension 进行 redux debug 处理
import { composeWithDevTools } from 'redux-devtools-extension'

// 引入 reducer
import reducer from './reducers'

// store
export default createStore(reducer, composeWithDevTools(applyMiddleware(thunk)));
