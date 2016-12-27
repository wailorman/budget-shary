import {initialState} from './initial-state';

import {
    FETCH_BUDGET,
    CHANGE_BUDGET_PROPS
} from './../actions';

export function budgetReducer(state = {}, action = {}) {

    switch (action.type){
        case FETCH_BUDGET:
        {
            return {
                ...((action.result || {}).budget || initialState.budget)
            };
        }

        case CHANGE_BUDGET_PROPS:
        {
            return {
                ...state,
                name: action.values.name
            };
        }
        default:
        {
            return state;
        }
    }

}