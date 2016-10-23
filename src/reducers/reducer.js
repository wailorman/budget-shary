import { combineReducers } from 'redux'
import {
    REMOVE_PRODUCT, NEW_PRODUCT, CHANGE_PRODUCT,
    REMOVE_PERSON, NEW_PERSON, CHANGE_PERSON,
    PROCEED_INTERCHANGE,
    UPDATE_SHARE_SUM,
    FETCH_BUDGET, CHANGE_BUDGET_PROPS,
    TOGGLE_PARTICIPATION
} from './../actions'

import {getProductsByPersonId} from './../core/components-utils'

// todo: >> action = {} ... and test it! --> Means that default action argument should == {}

// todo: Split all reducers to their own files

export const initialState = {
    budget: {},
    persons: {},
    products: {},
    productParticipating: {},
    transactions: [],
    common: {},
    errors: {
        products: {},
        persons: {},
        common: {}
    }

};

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

export function personsReducer(personsState = initialState.persons, action) {
    let newState = _.cloneDeep(personsState);

    switch (action.type) {

        case FETCH_BUDGET:

            if (action.result && action.result.persons){
                newState = action.result.persons;
                return newState;
            }else{
                return initialState.persons;
            }

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

        case TOGGLE_PARTICIPATION:

            if (action.meta && action.meta.newPersonShares) {

                _.forOwn(newState, (person, personId)=> {
                    person.share = action.meta.newPersonShares[personId] || 0;
                });

            }

            return newState;

        default:
            return personsState;
    }

}

export function commonReducer(commonState = {}, action = {}) {
    let newCommonState = _.cloneDeep(commonState);

    switch (action.type) {
        case FETCH_BUDGET:

            if (action.result && action.result.common){
                newCommonState = action.result.common;
                return newCommonState;
            }else{
                return initialState.common;
            }

        case UPDATE_SHARE_SUM:
            newCommonState.shareSum = action.value || commonState.shareSum;
            return newCommonState;
        default:

            if (action.meta && action.meta.newShareSum) {
                newCommonState.shareSum = action.meta.newShareSum;
                return newCommonState;
            } else {
                return commonState;
            }

    }

}

export function transactionsReducer(state = initialState.transactions, action = {}) {
    let newState = _.cloneDeep(state);

    switch (action.type){
        case FETCH_BUDGET:

            if (action.result && action.result.transactions){
                newState = action.result.transactions;
                return newState;
            }else{
                return initialState.transactions;
            }

        case PROCEED_INTERCHANGE:
            return action.meta.transactions;
        default:
            return state || [];
    }

}

export function errorsReducer(state = {}, action = {}) {

    if (action.meta && action.meta.errors) {
        return action.meta.errors;
    } else {
        return initialState.errors;
    }

}

export function budgetReducer(state = {}, action = {}) {

    let newState = _.cloneDeep(state);
    
    switch (action.type){
        case FETCH_BUDGET:
            if (action.result && action.result.budget) {
                return action.result.budget;
            } else {
                return initialState.budget;
            }

        case CHANGE_BUDGET_PROPS:
            newState.name = action.values.name;
            return newState;
        default:
            return newState;
    }
    
}

export function participatingReducer(state = {}, action = {}) {

    let newState = _.cloneDeep(state);

    switch (action.type){
        case FETCH_BUDGET:
            return action.result.productParticipating || newState;
        case TOGGLE_PARTICIPATION:

            const {productId, personId} = action;

            if (!newState[action.productId])
                newState[productId] = {};

            newState[productId][personId] = !newState[productId][personId];

            return newState;

        case REMOVE_PRODUCT:
            delete newState[action.id];
            return newState;

        case REMOVE_PERSON:
            _.forIn(newState, (productParticipationElem)=> {
                delete productParticipationElem[action.id];
            });

            return newState;
        
        default:
            return newState;
    }
    
}


export const combinedReducers = combineReducers({
    budget: budgetReducer,
    products: productsReducer,
    persons: personsReducer,
    productParticipating: participatingReducer,
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