export const REMOVE_PRODUCT = 'REMOVE_PRODUCT';
export const NEW_PRODUCT = 'NEW_PRODUCT';
export const CHANGE_PRODUCT = 'CHANGE_PRODUCT';

export const REMOVE_PERSON = 'REMOVE_PERSON';
export const NEW_PERSON = 'NEW_PERSON';
export const CHANGE_PERSON = 'CHANGE_PERSON';

export const PROCEED_INTERCHANGE = 'PROCEED_INTERCHANGE';

export const FETCH_BUDGET = 'FETCH_BUDGET';
export const CHANGE_BUDGET_PROPS = 'CHANGE_BUDGET_PROPS';

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


export function changeBudgetProps(values) {

    return {
        type: CHANGE_BUDGET_PROPS,
        values
    };
    
}

export function fetchBudget(id) {

    return {
        type: FETCH_BUDGET,
        id
    };
    
}

export function removeProduct(id) {
    return {
        type: REMOVE_PRODUCT,
        id
    };
}

export function newProduct(ownerId) {
    return {
        type: NEW_PRODUCT,
        ownerId
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
    return {
        type: NEW_PERSON
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
        productId, 
        personId
    };
    
}