import {
    FETCH_BUDGET
} from '../actions';
import { initialState } from './initial-state';

import * as reducerUtils from '../utils/reducer-utils';

module.exports = function commonReducer(state, action) {

    if (!state) return state;
    if (!action) return state;

    switch (action.type) {
        case FETCH_BUDGET:
        {
            return reducerUtils.fetch('result.common', state, action);
        }
        default:
        {
            if (action.meta && action.meta.newShareSum) {
                return state.set('shareSum', action.meta.newShareSum);
            } else {
                return state;
            }
        }

    }

}