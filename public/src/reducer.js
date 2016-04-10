import { combineReducers } from 'redux'
import { REMOVE_PRODUCT } from './actions'

export const defaultState = {

    //persons: {},
    products: {
        1: {
            id: 1, name: 'Water', price: '120'
        },
        2: {
            id: 2, name: 'Potatoes', price: '50'
        }
    }

};

export function productsReducer(state = defaultState.products, action) {

    let newState = _.cloneDeep(state);

    switch (action.type) {

        case REMOVE_PRODUCT:
            delete newState[action.id];
            return newState;

        default:
            return newState;
    }

}

export const reducers = combineReducers({
    products: productsReducer
});

export default reducers;