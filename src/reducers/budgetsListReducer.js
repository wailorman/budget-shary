import {
    FETCH_BUDGETS_LIST,
    DELETE_BUDGET
} from '../actions';

import {initialState} from './initial-state';

export function budgetsListReducer(state = initialState.budgetsList, action) {
    switch (action.type) {
        // todo: Cover with tests
        case FETCH_BUDGETS_LIST:
        {
            return {
                ...((action.result || {}) || initialState.budgetsList)
            };
        }
        case DELETE_BUDGET:
        {
            if (action.success){
                return Object
                    .keys(state)
                    .filter(budgetId => budgetId != action.id)
                    .reduce((result, currentId) => ({
                        ...result,
                        [currentId]: state[currentId]
                    }), {});
            } else {
                return state;
            }
        }
        default:
        {
            return state;
        }
    }
}