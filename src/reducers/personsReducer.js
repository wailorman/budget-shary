import {
    FETCH_BUDGET,
    REMOVE_PERSON,
    NEW_PERSON,
    CHANGE_PERSON,
    TOGGLE_PARTICIPATION
} from '../actions';

import {initialState} from './initial-state';

import * as reducerUtils from '../utils/reducer-utils';

export function personsReducer(state = initialState.persons, action = {}) {

    switch (action.type) {

        case FETCH_BUDGET:
            return reducerUtils.fetch('result.persons', state, action);

        case REMOVE_PERSON:
            return reducerUtils.remove(state, action);

        case NEW_PERSON:
            return reducerUtils.add(state, action);

        case CHANGE_PERSON:
            return reducerUtils.update(state, action);

        case TOGGLE_PARTICIPATION:
        {
            if (
                action.meta && action.meta.newPersonShares
            ) {

                return state
                    .map((person, personId) =>
                        person.set('share', action.meta.newPersonShares[personId] || '0'));

            }

            return state;
        }

        default:
        {
            return state;
        }
    }

}