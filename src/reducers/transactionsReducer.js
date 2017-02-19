import {initialState} from './initial-state';
import {
    FETCH_BUDGET,
    PROCEED_INTERCHANGE
} from '../actions';

import * as reducerUtils from '../utils/reducer-utils';

export function transactionsReducer(state = initialState.transactions, action = {}) {

    switch (action.type) {
        case FETCH_BUDGET:
            return reducerUtils.fetch('result.transactions', state, action);

        case PROCEED_INTERCHANGE:
            return reducerUtils.fetch('meta.transactions', state, action);

        default:
            return state || [];
    }

}