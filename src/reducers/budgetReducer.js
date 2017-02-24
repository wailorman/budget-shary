import {
    FETCH_BUDGET,
    CHANGE_BUDGET_PROPS
} from './../actions';

import * as Immutable from 'immutable';
import { initialState } from './initial-state';

export function budgetReducer (state = initialState.budget, action = {}) {

    switch (action.type) {
        case FETCH_BUDGET: {
            return Immutable.Map(action.result.budget);
        }

        case CHANGE_BUDGET_PROPS: {
            return Immutable.Map(state)
                .merge(Immutable.Map(action.values));
        }
        default: {
            return state;
        }
    }

}