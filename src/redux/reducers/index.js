
import { combineReducers } from 'redux'

import persons from './person'

// 汇总所有的 reducer 变成一个总的 reducer
export default combineReducers({
    persons,
});
