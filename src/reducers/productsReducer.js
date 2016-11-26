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
    let newState = _.cloneDeep(state);

    switch (action.type) {

        case FETCH_BUDGET:
        {
            return _.get(action, 'result.products', initialState.products);
        }

        case REMOVE_PRODUCT:
        {
            if (newState[action.id]) {
                delete newState[action.id];
                return newState;
            }else{
                return state;
            }
        }

        case NEW_PRODUCT: {

            if ( !action.ownerId || !action.id || state[action.id] )
                return state;

            newState[action.id] = {id: action.id, name: '', price: '', ownerId: action.ownerId};

            return newState;
        }

        case CHANGE_PRODUCT:
        {
            if (!newState[action.id]) return state;

            const consideringProduct = newState[action.id];

            const isValuesOld = _.reduce(
                action.values,
                (isPreviousOld, value, key) => isPreviousOld || value == consideringProduct[key],
                false // <- isPreviousOld
            );

            if (isValuesOld) return state;

            newState[action.id] = _.assign(consideringProduct, action.values);

            return newState;
        }

        case REMOVE_PERSON:
        {
            const personId = action.id;

            const personOwnProducts = getProductsByPersonId(personId, newState);
            const personOwnProductsIds = _.keys(personOwnProducts);

            personOwnProductsIds.forEach((productId)=> {
                delete newState[productId];
            });

            return newState;
        }

        default:
        {
            return state;
        }
    }

}