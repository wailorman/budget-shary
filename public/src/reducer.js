import { combineReducers } from 'redux'
import {
    REMOVE_PRODUCT, NEW_PRODUCT, CHANGE_PRODUCT,
    REMOVE_PERSON, NEW_PERSON, CHANGE_PERSON,
    PROCEED_INTERCHANGE, PUT_INTERCHANGE_RESULTS,
    DISPLAY_INTERCHANGE_ERROR, REMOVE_INTERCHANGE_ERRORS,
    PUT_PERSONS_ERRORS, PUT_VALIDATION_ERRORS,
    UPDATE_SHARE_SUM
} from './actions'

import { proceedInterchange } from './core/utils'

// todo: >> action = {} ... and test it!

export const defaultState = {

    persons: [
        {id: '_1', name: 'Jack', share: '30'},
        {id: '_2', name: 'Alice', share: '60'},
        {id: '_3', name: 'Mike', share: '10'}
    ],
    products: [
        {id: '_1', name: '',     price: '45',    ownerId: '_1'},
        {id: '_2', name: '',     price: '234',   ownerId: '_1'},
        {id: '_3', name: '',     price: '12',    ownerId: '_1'},
        {id: '_4', name: '',     price: '89',    ownerId: '_1'},
        {id: '_5', name: '',     price: '65',    ownerId: '_1'},
        {id: '_6', name: '',     price: '234',   ownerId: '_1'},

        {id: '_7', name: '',     price:  '345',  ownerId: '_2'},
        {id: '_8', name: '',     price:  '234',  ownerId: '_2'},
        {id: '_9', name: '',     price:  '890',  ownerId: '_2'},
        {id: '_10', name: '',    price: '1234',  ownerId: '_2'},
        {id: '_11', name: '',    price: '671',   ownerId: '_2'},
        {id: '_12', name: '',    price: '55',    ownerId: '_2'},
        {id: '_13', name: '',    price: '176',   ownerId: '_2'},
        {id: '_14', name: '',    price: '1876',  ownerId: '_2'},

        {id: '_15', name: '',    price: '504',   ownerId: '_3'},
        {id: '_16', name: '',    price: '646',   ownerId: '_3'},
        {id: '_17', name: '',    price: '756',   ownerId: '_3'},
        {id: '_18', name: '',    price: '50',    ownerId: '_3'}
    ],
    transactions: [],
    errors: {}

};

export function productsReducer(productsState = defaultState.products, action) {

    switch (action.type) {

        case REMOVE_PRODUCT:
            return productsState.filter((value)=> {
                return value.id != action.id;
            });

        case NEW_PRODUCT:
            return productsState.concat([{
                id: _.uniqueId(),
                name: '',
                price: '',
                ownerId: action.ownerId
            }]);

        case CHANGE_PRODUCT:
            return productsState.map((product)=> {
                if (product.id != action.id) return product;

                return _.assign(product, action.values);
            });

        case REMOVE_PERSON:
            return productsState.filter((product)=> {
                return product.ownerId != action.id;
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

                return _.assign(person, action.values);
            });

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

// todo: Substitute default state to []
export function transactionsReducer(state = defaultState, action) {

    switch (action.type){
        case PUT_INTERCHANGE_RESULTS:
            return action.transactions;
        default:
            return state;
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

export const reducers = function (state, action) {

    switch (action.type) {
        default:
            return combinedReducers(state, action);
    }

};

export const combinedReducers = combineReducers({
    products: productsReducer,
    persons: personsReducer,
    transactions: transactionsReducer,
    errors: errorsReducer,
    common: commonReducer
});

export default reducers;