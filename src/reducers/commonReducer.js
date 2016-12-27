import {initialState} from './initial-state';

import {
    FETCH_BUDGET
} from '../actions';


export function commonReducer(state = {}, action = {}) {

    switch (action.type) {
        case FETCH_BUDGET:
        {
            return {
                ...((action.result || {}).common || initialState.common)
            };
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