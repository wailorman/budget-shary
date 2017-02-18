import {initialState} from './initial-state';

import {
    FETCH_BUDGET,
    REMOVE_PRODUCT,
    NEW_PRODUCT,
    CHANGE_PRODUCT,
    REMOVE_PERSON
} from '../actions';

import * as reducerUtils from '../utils/reducer-utils';

export function productsReducer(state = initialState.products, action = {}) {
    switch (action.type) {

        case FETCH_BUDGET:
            return reducerUtils.fetch('result.products', state, action);

        case REMOVE_PRODUCT:
            return reducerUtils.remove(state, action);

        case NEW_PRODUCT:
            return reducerUtils.add(state, action);

        case CHANGE_PRODUCT:
            return reducerUtils.update(state, action);

        case REMOVE_PERSON:
            return state
                .filter((product) => product.get('ownerId') != action.id);

        default:
        {
            return state;
        }
    }

}