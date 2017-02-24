import {
    FETCH_BUDGETS_LIST,
    DELETE_BUDGET
} from '../actions';

import {initialState} from './initial-state';

import * as Immutable from 'immutable';

export function budgetsListReducer(state = initialState.budgetsList, action) {
    switch (action.type) {
        case FETCH_BUDGETS_LIST:
            return Immutable.Map(
                Object
                    .entries(action.result)
                    .map(([id, budget]) => {
                        return [id, Immutable.Map(budget)];
                    })
            );
        case DELETE_BUDGET:
        {
            if (action.success){

                return Immutable.Map(state)
                    .filterNot((budget, id) => id == action.id);

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
