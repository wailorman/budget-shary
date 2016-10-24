import {initialState} from './initial-state'

import {
    FETCH_BUDGET,
    REMOVE_PRODUCT,
    NEW_PRODUCT,
    CHANGE_PRODUCT,
    REMOVE_PERSON
} from '../actions'

import {getProductsByPersonId} from './../core/components-utils'


export function productsReducer(productsState = initialState.products, action) {
    let newState = _.cloneDeep(productsState);

    switch (action.type) {

        case FETCH_BUDGET:

            if (action.result && action.result.products){
                newState = action.result.products;
                return newState;
            }else{
                return initialState.products;
            }

        case REMOVE_PRODUCT:
            delete newState[action.id];

            return newState;

        case NEW_PRODUCT:

            const newProductId = _.uniqueId('__');

            newState[newProductId] = {id: newProductId, name: '', price: '', ownerId: action.ownerId};

            return newState;

        case CHANGE_PRODUCT:
            if (!newState[action.id]) return newState;

            const consideringProduct = _.cloneDeep(newState[action.id]);

            newState[action.id] = _.assign(consideringProduct, action.values);

            return newState;

        case REMOVE_PERSON:

            const personId = action.id;

            const personOwnProducts = getProductsByPersonId(personId, newState);
            const personOwnProductsIds = _.keys(personOwnProducts);

            personOwnProductsIds.forEach((productId)=> {
                delete newState[productId];
            });

            return newState;

        default:
            return productsState;
    }

}