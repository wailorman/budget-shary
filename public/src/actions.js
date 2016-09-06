import interchange from './core/interchange-facade'

export const REMOVE_PRODUCT = 'REMOVE_PRODUCT';
export const NEW_PRODUCT = 'NEW_PRODUCT';
export const CHANGE_PRODUCT = 'CHANGE_PRODUCT';

export const REMOVE_PERSON = 'REMOVE_PERSON';
export const NEW_PERSON = 'NEW_PERSON';
export const CHANGE_PERSON = 'CHANGE_PERSON';

export const PROCEED_INTERCHANGE = 'PROCEED_INTERCHANGE';
export const PUT_INTERCHANGE_RESULTS = 'PUT_INTERCHANGE_RESULTS';
export const DISPLAY_INTERCHANGE_ERROR = 'DISPLAY_INTERCHANGE_ERROR';
export const REMOVE_INTERCHANGE_ERRORS = 'REMOVE_INTERCHANGE_ERRORS';
export const PUT_PERSONS_ERRORS = 'PUT_PERSONS_ERRORS';
export const PUT_VALIDATION_ERRORS = 'PUT_VALIDATION_ERRORS';

export const UPDATE_SHARE_SUM = 'UPDATE_SHARE_SUM';

export const FETCH_BUDGET = 'FETCH_BUDGET';

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
    }
}

export function newProduct(ownerId) {
    return {
        type: NEW_PRODUCT,
        ownerId
    }
}

export function changeProduct(id, values) {

    return {
        type: CHANGE_PRODUCT,
        id,
        values
    }

}


export function removePerson(id) {
    return {
        type: REMOVE_PERSON,
        id
    }
}

export function newPerson() {
    return {
        type: NEW_PERSON
    }
}

export function changePerson(id, values) {

    return {
        type: CHANGE_PERSON,
        id,
        values
    }

}

export function updateShareSum(newShareSum) {

    return {
        type: UPDATE_SHARE_SUM,
        value: newShareSum
    };
    
}

export function putValidationErrors(errors) {
    return {
        type: PUT_VALIDATION_ERRORS,
        errors
    };
}

export function putPersonsErrors(errors) {
    return {
        type: PUT_PERSONS_ERRORS,
        errors
    };
}

// todo: Rewrite to saga. Because I can't test it

export function realizeInterchange() {
    return (dispatch, getState) => {

        // todo: >> dispatch(removeInterchangeErrors());

        return interchange(getState())
            .then((res)=> {
                return dispatch(putInterchangeResults(res));
            })
            .catch((err)=> {
                console.error(`realizeInterchange() error: ${err}`);
                return dispatch(displayInterchangeError(err));
            });
    };
}

export function putInterchangeResults(transactions) {
    return {
        type: PUT_INTERCHANGE_RESULTS,
        transactions
    };
}

export function displayInterchangeError(error) {
    return {
        type: DISPLAY_INTERCHANGE_ERROR,
        error
    };
}

export function removeInterchangeErrors() {
    return {
        type: REMOVE_INTERCHANGE_ERRORS
    };
}