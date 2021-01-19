
import { ADDED_PERSON } from '../constant'

const initState = [];

export default function (preState = initState, action) {
    const { type, data } = action;
    switch (type) {
        case ADDED_PERSON:
            return [data, ...preState];
        default:
            return preState;
    }
};
