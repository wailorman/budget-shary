import { combineReducers } from 'redux'
import {
    REMOVE_PRODUCT, NEW_PRODUCT, CHANGE_PRODUCT,
    REMOVE_PERSON, NEW_PERSON, CHANGE_PERSON
} from './actions'

export const defaultState = Immutable({

    persons: [
        {id: '201', name: 'Mike', share: '120'},
        {id: '202', name: 'Jack', share: '50'}
    ],
    products: [
        {id: '101', name: 'Water', price: '120'},
        {id: '102', name: 'Potatoes', price: '50'}
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

        case CHANGE_PRODUCT:
            return productsState.map((product)=> {
                if (product.id != action.id) return product;

                return _.assign(product.asMutable(), action.values);
            });

        default:
            return productsState;
    }

}

export function personsReducer(personsState = defaultState.persons, action) {

    switch (action.type) {

        case REMOVE_PERSON:
            return personsState.filter((value)=> {
                return value.id != action.id;
            });

        case NEW_PERSON:
            return personsState.concat([{id: _.uniqueId(), name: '', share: ''}]);

        case CHANGE_PERSON:
            return personsState.map((person)=> {
                if (person.id != action.id) return person;

                return _.assign(person.asMutable(), action.values);
            });

        default:
            return personsState;
    }

}

export const reducers = combineReducers({
    products: productsReducer,
    persons: personsReducer
});

export default reducers;