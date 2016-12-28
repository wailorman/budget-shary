import {initialState} from './initial-state';

import {
    FETCH_BUDGET,
    REMOVE_PRODUCT,
    NEW_PRODUCT,
    CHANGE_PRODUCT,
    REMOVE_PERSON
} from '../actions';

import * as Immutable from 'immutable';

export function productsReducer(state = initialState.products, action = {}) {
    switch (action.type) {

        case FETCH_BUDGET:
        {
            return Immutable.Map(action.result.products).toJS();
        }

        case REMOVE_PRODUCT:
        {
            return Immutable.Map(state)
                .filterNot(({id}) => id == action.id)
                .toJS();
        }

        case NEW_PRODUCT: {

            if ( !action.ownerId || !action.id || state[action.id] )
                return state;

            return Immutable.Map(state)
                .set(action.id, {
                    id: action.id,
                    name: '',
                    price: '',
                    ownerId: action.ownerId
                })
                .toJS();
        }

        case CHANGE_PRODUCT:
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

        case REMOVE_PERSON:
        {

            return Immutable.Map(state)
                .filterNot(({id}) => id == action.id)
                .toJS();

        }
        default:
        {
            return state;
        }
    }

}