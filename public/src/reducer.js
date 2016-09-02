import { combineReducers } from 'redux'
import {
    REMOVE_PRODUCT, NEW_PRODUCT, CHANGE_PRODUCT,
    REMOVE_PERSON, NEW_PERSON, CHANGE_PERSON,
    PUT_INTERCHANGE_RESULTS,
    PUT_PERSONS_ERRORS, PUT_VALIDATION_ERRORS,
    UPDATE_SHARE_SUM
} from './actions'

import {fetchState} from './core/state-sync'

import {getProductsByPersonId} from './core/components-utils'

// todo: >> action = {} ... and test it!

export const defaultState = fetchState() || {

        persons: {
            _1: {id: '_1', name: 'Jack', share: '30'},
            _2: {id: '_2', name: 'Alice', share: '60'},
            _3: {id: '_3', name: 'Mike', share: '10'}
        },
        products: {
            _1: {id: '_1', name: 'Milk', price: '45', ownerId: '_1'},
            _2: {id: '_2', name: 'Beer', price: '234', ownerId: '_1'},
            _3: {id: '_3', name: 'Chips', price: '12', ownerId: '_1'},
            _4: {id: '_4', name: 'Water', price: '89', ownerId: '_1'},
            _5: {id: '_5', name: 'Apples', price: '65', ownerId: '_1'},
            _6: {id: '_6', name: 'Alcohol', price: '234', ownerId: '_1'},

            _7: {id: '_7', name: 'Cigarettes', price: '345', ownerId: '_2'},
            _8: {id: '_8', name: 'Potatoes', price: '234', ownerId: '_2'},
            _9: {id: '_9', name: 'Fish', price: '890', ownerId: '_2'},
            _10: {id: '_10', name: 'Beef', price: '1234', ownerId: '_2'},
            _11: {id: '_11', name: 'Water', price: '671', ownerId: '_2'},
            _12: {id: '_12', name: 'Sweets', price: '55', ownerId: '_2'},
            _13: {id: '_13', name: 'Tomatoes', price: '176', ownerId: '_2'},
            _14: {id: '_14', name: 'Gears', price: '1876', ownerId: '_2'},

            _15: {id: '_15', name: 'Tongs', price: '504', ownerId: '_3'},
            _16: {id: '_16', name: 'Wine', price: '646', ownerId: '_3'},
            _17: {id: '_17', name: 'Cake', price: '756', ownerId: '_3'},
            _18: {id: '_18', name: 'Chips', price: '50', ownerId: '_3'}
        },
        transactions: [],
        errors: {
            products: {},
            persons: {},
            common: {}
        }

    };

const initialState = defaultState;

export function productsReducer(productsState = initialState.products, action) {
    let newState = _.cloneDeep(productsState);

    switch (action.type) {

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

export function personsReducer(personsState = initialState.persons, action) {
    let newState = _.cloneDeep(personsState);

    switch (action.type) {

        case REMOVE_PERSON:
            delete newState[action.id];

            return newState;

        case NEW_PERSON:
            const newPersonId = _.uniqueId('__');

            newState[newPersonId] = {id: newPersonId, name: '', share: ''};

            return newState;

        case CHANGE_PERSON:
            if (!newState[action.id]) return newState;

            const consideringPerson = _.cloneDeep(newState[action.id]);

            newState[action.id] = _.assign(consideringPerson, action.values);

            return newState;

        default:
            return personsState;
    }

}

export function commonReducer(commonState = {}, action = {}) {
    let newCommonState = _.cloneDeep(commonState);

    switch (action.type) {
        case UPDATE_SHARE_SUM:
            newCommonState.shareSum = action.value || commonState.shareSum;
            return newCommonState;
        default:
            return commonState;
    }

}

export function transactionsReducer(state = initialState.transactions, action = {}) {

    switch (action.type){
        case PUT_INTERCHANGE_RESULTS:
            return action.transactions;
        default:
            return state || [];
    }

}

export function errorsReducer(state = {}, action = {}) {
    let newErrorsState = _.cloneDeep(state);

    switch (action.type) {
        case PUT_VALIDATION_ERRORS:
            return action.errors; // new errors state
        case PUT_PERSONS_ERRORS:
            newErrorsState.persons = action.errors;
            return newErrorsState;
        default:
            return state;
    }

}

export const combinedReducers = combineReducers({
    products: productsReducer,
    persons: personsReducer,
    transactions: transactionsReducer,
    errors: errorsReducer,
    common: commonReducer
});

export const reducer = function (state, action) {

    switch (action.type) {
        default:
            return combinedReducers(state, action);
    }

};

export default reducer;