import {
    FETCH_BUDGETS_LIST,
    DELETE_BUDGET
} from '../actions';

import {initialState} from './initial-state';

export function budgetsListReducer(budgetsListState = initialState.budgetsList, action) {
    let newState = _.cloneDeep(budgetsListState);

    switch (action.type) {
        // todo: Cover with tests
        case FETCH_BUDGETS_LIST:
        {
            return _.get(action, 'result', initialState.budgetsList);
        }
        case DELETE_BUDGET:
        {
            if (action.success){
                return _.pickBy(newState, (budget)=> budget.id != action.id);
            }else{
                return budgetsListState;
            }
        }
        default:
        {
            return budgetsListState;
        }
    }
}