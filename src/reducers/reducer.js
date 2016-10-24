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
import {budgetReducer} from './budgetReducer'
import {participatingReducer} from './participatingReducer'

// todo: >> action = {} ... and test it! --> Means that default action argument should == {}


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