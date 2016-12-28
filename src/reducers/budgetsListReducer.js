import {
    FETCH_BUDGETS_LIST,
    DELETE_BUDGET
} from '../actions';

import {initialState} from './initial-state';

import * as Immutable from 'immutable';

export function budgetsListReducer(state = initialState.budgetsList, action) {
    switch (action.type) {
        // todo: Cover with tests
        case FETCH_BUDGETS_LIST:
        {
            return Immutable.Map(action.result).toJS();
        }
        case DELETE_BUDGET:
        {
            if (action.success){

                return Immutable.Map(state)
                    .filterNot((budget, id) => id == action.id)
                    .toJS();

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