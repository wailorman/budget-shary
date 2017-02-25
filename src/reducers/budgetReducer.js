import {
    FETCH_BUDGET,
    CHANGE_BUDGET_PROPS
} from './../actions';

import { fromJS } from 'immutable';
import { initialState } from './initial-state';
import * as reducerUtils from '../utils/reducer-utils';

export function budgetReducer (state = initialState.budget, action = {}) {

    switch (action.type) {
        case FETCH_BUDGET:
            return reducerUtils.fetch('result.budget', state, action);

        case CHANGE_BUDGET_PROPS:
            if (action.id != state.get('id'))
                return state;
            else
                return state.merge(fromJS(action.values));

        default:
            return state;
    }

}
