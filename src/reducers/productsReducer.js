import {initialState} from './initial-state';

import {
    FETCH_BUDGET,
    REMOVE_PRODUCT,
    NEW_PRODUCT,
    CHANGE_PRODUCT,
    REMOVE_PERSON
} from '../actions';

import {getProductsByPersonId} from './../core/components-utils';


export function productsReducer(state = initialState.products, action = {}) {
    switch (action.type) {

        case FETCH_BUDGET:
        {
            return {
                ...((action.result || {}).products || initialState.products)
            };
        }

        case REMOVE_PRODUCT:
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

        case NEW_PRODUCT: {

            if ( !action.ownerId || !action.id || state[action.id] )
                return state;

            return {
                ...state,
                [action.id]: {
                    id: action.id,
                    name: '',
                    price: '',
                    ownerId: action.ownerId
                }
            };
        }

        case CHANGE_PRODUCT:
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

        case REMOVE_PERSON:
        {

            return Object
                .keys(state)
                .map(id => state[id])
                .filter(product => product.ownerId != action.id)
                .map(product => product.id)
                .reduce((result, currentId) => ({
                    ...result,
                    [currentId]: state[currentId]
                }), {});
        }
        default:
        {
            return state;
        }
    }

}