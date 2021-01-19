
import { ADDED_PERSON } from '../constant'

// 同步 action 返回一般对象
export const createAddedPersonAction = (data) => ({ type: ADDED_PERSON, data });

// 异步 action 返回函数
export const createAddedPersonAsyncAction = (data, time) => {
    return dispatch => {
        setTimeout(() => {
            dispatch(createAddedPersonAction(data));
        }, time)
    };
};
