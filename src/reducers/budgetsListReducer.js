import {
    FETCH_BUDGETS_LIST
} from '../actions';

import {initialState} from './initial-state';

export function budgetsListReducer(budgetsListState = initialState.budgetsList, action) {
    // let newState = _.cloneDeep(budgetsListState);

    switch (action.type) {
        // todo: Cover with tests
        case FETCH_BUDGETS_LIST:
        {
            return _.get(action, 'result', initialState.budgetsList);
        }
        default:
        {
            return budgetsListState;
        }
    }
}