import {initialState} from './initial-state'
import {
    FETCH_BUDGET,
    PROCEED_INTERCHANGE
} from '../actions'


export function transactionsReducer(state = initialState.transactions, action = {}) {
    let newState = _.cloneDeep(state);

    switch (action.type){
        case FETCH_BUDGET:

            if (action.result && action.result.transactions){
                newState = action.result.transactions;
                return newState;
            }else{
                return initialState.transactions;
            }

        case PROCEED_INTERCHANGE:
            return action.meta.transactions;
        default:
            return state || [];
    }

}