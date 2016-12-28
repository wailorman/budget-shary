import {
    FETCH_BUDGET,
    REMOVE_PERSON,
    NEW_PERSON,
    CHANGE_PERSON,
    TOGGLE_PARTICIPATION
} from '../actions';

import {initialState} from './initial-state';

import * as Immutable from 'immutable';

export function personsReducer(state = initialState.persons, action = {}) {

    switch (action.type) {

        case FETCH_BUDGET:
        {
            return Immutable.Map(action.result.persons).toJS();
        }

        case REMOVE_PERSON:
        {
            return Immutable.Map(state)
                .filterNot((person, id) => action.id == id)
                .toJS();
        }

        case NEW_PERSON:
        {
            if ( !action.id || state[action.id] ) return state;

            return Immutable.Map(state)
                .set(action.id, {
                    id: action.id,
                    name: '',
                    share: ''
                })
                .toJS();
        }

        case CHANGE_PERSON:
        {
            if (!state[action.id]) return state;

            return Immutable.Map(state)
                .merge({
                    [action.id]: {
                        ...state[action.id],
                        ...action.values
                    }
                })
                .toJS();
        }

        case TOGGLE_PARTICIPATION:
        {
            if (
                action.meta && action.meta.newPersonShares &&
                action.productId && action.personId
            ) {

                return Immutable.Map(state)
                    .map(person => Immutable.Map(person))
                    .map((person, personId) =>
                        person.set('share', action.meta.newPersonShares[personId], 0))
                    .toJS();

            }

            return state;
        }

        default:
        {
            return state;
        }
    }

}