import {initialState} from './initial-state';
import {
    FETCH_BUDGET,
    PROCEED_INTERCHANGE
} from '../actions';


export function transactionsReducer(state = initialState.transactions, action = {}) {
    let newState = _.cloneDeep(state);

    switch (action.type) {
        case FETCH_BUDGET:

            return _.get(action, 'result.transactions', initialState.transactions);

        case PROCEED_INTERCHANGE:
            return action.meta.transactions;
        default:
            return state || [];
    }

}