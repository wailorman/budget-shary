import { combineReducers } from 'redux';

import {productsReducer} from './productsReducer';
import {personsReducer} from './personsReducer';
import {commonReducer} from './commonReducer';
import {transactionsReducer} from './transactionsReducer';
import {errorsReducer} from './errorsReducer';
import {budgetReducer} from './budgetReducer';
import {participatingReducer} from './participatingReducer';
import {budgetsListReducer} from './budgetsListReducer';

import { routerReducer } from 'react-router-redux';

// todo: >> action = {} ... and test it! --> Means that default action argument should == {}


export const combinedReducers = combineReducers({
    routing: routerReducer,
    budgetsList: budgetsListReducer,
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