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

import {initialState} from './initial-state'

import {productsReducer} from './productsReducer'
import {personsReducer} from './personsReducer'
import {commonReducer} from './commonReducer'
import {transactionsReducer} from './transactionsReducer'
import {errorsReducer} from './errorsReducer'

// todo: >> action = {} ... and test it! --> Means that default action argument should == {}





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