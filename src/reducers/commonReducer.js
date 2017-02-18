import {
    FETCH_BUDGET
} from '../actions';
import { initialState } from './initial-state';

import * as reducerUtils from '../utils/reducer-utils';

export function commonReducer(state = initialState.common, action = {}) {

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