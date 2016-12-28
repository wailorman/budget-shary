import {
    FETCH_BUDGET,
    CHANGE_BUDGET_PROPS
} from './../actions';

import * as Immutable from 'immutable';

export function budgetReducer (state = {}, action = {}) {

    switch (action.type) {
        case FETCH_BUDGET: {
            return Immutable.Map(action.result.budget).toJS();
        }

        case CHANGE_BUDGET_PROPS: {
            return Immutable.Map(state)
                .merge(Immutable.Map(action.values))
                .toJS();
        }
        default: {
            return state;
        }
    }

}