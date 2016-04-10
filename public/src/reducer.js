import { combineReducers } from 'redux'
import { REMOVE_PRODUCT, NEW_PRODUCT } from './actions'

export const defaultState = Immutable({

    products: [
        {id: '1', name: 'Water', price: '120'},
        {id: '2', name: 'Potatoes', price: '50'}
    ]

});

export function productsReducer(productsState = defaultState.products, action) {

    switch (action.type) {

        case REMOVE_PRODUCT:
            return productsState.filter((value)=> {
                return value.id != action.id;
            });

        case NEW_PRODUCT:
            return productsState.concat([{id: _.uniqueId(), name: '', price: ''}]);

        default:
            return productsState;
    }

}

export const reducers = combineReducers({
    products: productsReducer
});

export default reducers;