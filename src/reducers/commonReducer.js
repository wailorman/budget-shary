import {
    FETCH_BUDGET
} from '../actions';

import * as Immutable from 'immutable';

export function commonReducer(state = {}, action = {}) {

    switch (action.type) {
        case FETCH_BUDGET:
        {
            return Immutable.Map(action.result.common).toJS();
        }
        default:
        {
            if (action.meta && action.meta.newShareSum) {
                return {
                    ...state,
                    shareSum: action.meta.newShareSum
                };
            } else {
                return state;
            }
        }

    }

}