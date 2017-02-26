import {push} from 'react-router-redux';
import shortid from 'shortid';

import {createBudget} from './core/state-sync';

export const REMOVE_PRODUCT = 'REMOVE_PRODUCT';
export const NEW_PRODUCT = 'NEW_PRODUCT';
export const CHANGE_PRODUCT = 'CHANGE_PRODUCT';

export const REMOVE_PERSON = 'REMOVE_PERSON';
export const NEW_PERSON = 'NEW_PERSON';
export const CHANGE_PERSON = 'CHANGE_PERSON';
export const CHANGE_BUDGET_PROPS = 'CHANGE_BUDGET_PROPS';

export const PROCEED_INTERCHANGE = 'PROCEED_INTERCHANGE';

export const FETCH_BUDGET = 'FETCH_BUDGET';
export const NEW_BUDGET = 'NEW_BUDGET';
export const FETCH_BUDGETS_LIST = 'FETCH_BUDGETS_LIST';
export const DELETE_BUDGET = 'DELETE_BUDGET';

export const TOGGLE_PARTICIPATION = 'TOGGLE_PARTICIPATION';


export const budgetSyncActions = [
    REMOVE_PRODUCT,
    NEW_PRODUCT,
    CHANGE_PRODUCT,
    REMOVE_PERSON,
    NEW_PERSON,
    CHANGE_PERSON,
    PROCEED_INTERCHANGE,
    CHANGE_BUDGET_PROPS,
    TOGGLE_PARTICIPATION
];


export function changeBudgetProps(id, values) {

    return {
        type: CHANGE_BUDGET_PROPS,
        id,
        values: { id, ...values }
    };

}

export function deleteBudget(id) {

    return {
        type: DELETE_BUDGET,
        id
    };

}

export function newBudget() {

    return (dispatch)=> {

        const newBudgetId = createBudget().budget.id;

        dispatch(push(`/budgets/${newBudgetId}`));

    };

}

export function fetchBudget(id) {

    return {
        type: FETCH_BUDGET,
        id
    };

}

export function fetchBudgetsList() {
    return {
        type: FETCH_BUDGETS_LIST
    };
}

export function removeProduct(id) {
    return {
        type: REMOVE_PRODUCT,
        id
    };
}

export function newProduct(ownerId) {
    const id = `_product_${shortid.generate()}`;
    return {
        type: NEW_PRODUCT,
        id,
        ownerId,
        values: {
            id,
            name: '',
            price: '',
            ownerId
        }
    };
}

export function changeProduct(id, values) {

    return {
        type: CHANGE_PRODUCT,
        id,
        values
    };

}


export function removePerson(id) {
    return {
        type: REMOVE_PERSON,
        id
    };
}

export function newPerson() {
    const id = `_person_${shortid.generate()}`;
    return {
        type: NEW_PERSON,
        id,
        values: {
            id,
            name: '',
            share: ''
        }
    };
}

export function changePerson(id, values) {

    return {
        type: CHANGE_PERSON,
        id,
        values
    };

}

export function realizeInterchange() {

    return {
        type: PROCEED_INTERCHANGE
    };

}


export function toggleParticipation(productId, personId) {

    return {
        type: TOGGLE_PARTICIPATION,
        productId: productId,
        personId: personId
    };

}
