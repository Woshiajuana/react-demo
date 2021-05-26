
import { createStore } from './redux'

const initState = {
    parentToOneGrandson: '',
    oneGrandsonToParent: '',
    parentToChildren: '',
    oneGrandsonToThreeChild: '',
};

const reducer = (state, action) => {
    const { type, data } = action;
    switch (type) {
        case 'PARENT_TO_ONE_GRANDSON':
            state = { ...state, parentToOneGrandson: data };
            break;
        case 'ONE_GRANDSON_TO_PARENT':
            state = { ...state, oneGrandsonToParent: data };
            break;
        case 'ONE_GRANDSON_TO_THREE_CHILD':
            state = { ...state, oneGrandsonToThreeChild: data };
            break;
        case 'PARENT_TO_CHILDREN':
            state = { ...state, parentToChildren: data };
            break;
    }
    return state;
};

export default createStore(reducer, initState);
