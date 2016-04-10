import { REMOVE_PRODUCT } from './actions'

export const defaultState = {

    persons: {},
    products: {}

};

export function reducer(state = defaultState, action) {
    let newState = _.cloneDeep(state);

    switch (action.type) {

        case REMOVE_PRODUCT:
            delete newState.products[action.id];
            return newState;

        default:
            return newState;
    }
}

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

export default reducer;