import {
    FETCH_BUDGET,
    CHANGE_BUDGET_PROPS
} from './../actions';

import * as Immutable from 'immutable';

export function budgetReducer (state = {}, action = {}) {

    switch (action.type) {
        case FETCH_BUDGET: {

            const result = Immutable.Map(action.result.budget);

            return result.toJS();
        }

        case CHANGE_BUDGET_PROPS: {

            const result = Immutable.Map(state);

            return result.merge(Immutable.Map(action.values)).toJS();
        }
        default: {
            return state;
        }
    }

}