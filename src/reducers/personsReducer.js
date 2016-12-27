import {
    FETCH_BUDGET,
    REMOVE_PERSON,
    NEW_PERSON,
    CHANGE_PERSON,
    TOGGLE_PARTICIPATION
} from '../actions';

import {initialState} from './initial-state';

export function personsReducer(state = initialState.persons, action = {}) {

    switch (action.type) {

        case FETCH_BUDGET:
        {
            return {
                ...((action.result || {}).persons || initialState.persons)
            };
        }

        case REMOVE_PERSON:
        {

            if (!state[action.id]) return state;

            return Object
                .keys(state)
                .filter(id => id != action.id)
                .reduce((result, currentId) => ({
                    ...result,
                    [currentId]: state[currentId]
                }), {});
        }

        case NEW_PERSON:
        {
            if ( !action.id || state[action.id] ) return state;

            return {
                ...state,
                [action.id]: {
                    id: action.id,
                    name: '',
                    share: ''
                }
            };
        }

        case CHANGE_PERSON:
        {
            if (!state[action.id]) return state;

            return {
                ...state,
                [action.id]: {
                    ...state[action.id],
                    ...action.values
                }
            };
        }

        case TOGGLE_PARTICIPATION:
        {
            if (
                action.meta && action.meta.newPersonShares &&
                action.productId && action.personId
            ) {

                return Object
                    .keys(state)
                    .reduce((result, personId) => {
                        const person = state[personId];

                        result[personId] = {
                            ...person,
                            share: action.meta.newPersonShares[personId] || 0
                        };

                        return result;

                    }, {});

            }

            return state;
        }

        default:
        {
            return state;
        }
    }

}