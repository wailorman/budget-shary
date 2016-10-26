import {initialState} from './initial-state';

import {
    FETCH_BUDGET,
    CHANGE_BUDGET_PROPS
} from './../actions';

export function budgetReducer(state = {}, action = {}) {

    let newState = _.cloneDeep(state);

    switch (action.type){
        case FETCH_BUDGET:
        {
            return _.get(action, 'result.budget', initialState.budget);
        }

        case CHANGE_BUDGET_PROPS:
        {
            newState.name = action.values.name;
            return newState;
        }
        default:
        {
            return newState;
        }
    }

}