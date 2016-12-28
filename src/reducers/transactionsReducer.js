import {initialState} from './initial-state';
import {
    FETCH_BUDGET,
    PROCEED_INTERCHANGE
} from '../actions';

import * as Immutable from 'immutable';

export function transactionsReducer(state = initialState.transactions, action = {}) {

    switch (action.type) {
        case FETCH_BUDGET:
            return Immutable.List(action.result.transactions).toJS();

        case PROCEED_INTERCHANGE:
            return action.meta.transactions;
        default:
            return state || [];
    }

}