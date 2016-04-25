import interchange from './core/interface'

export const REMOVE_PRODUCT = 'REMOVE_PRODUCT';
export const NEW_PRODUCT = 'NEW_PRODUCT';
export const CHANGE_PRODUCT = 'CHANGE_PRODUCT';

export const REMOVE_PERSON = 'REMOVE_PERSON';
export const NEW_PERSON = 'NEW_PERSON';
export const CHANGE_PERSON = 'CHANGE_PERSON';

export const PROCEED_INTERCHANGE = 'PROCEED_INTERCHANGE';
export const PUT_INTERCHANGE_RESULTS = 'PUT_INTERCHANGE_RESULTS';
export const DISPLAY_INTERCHANGE_ERROR = 'DISPLAY_INTERCHANGE_ERROR';

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

export function proceedInterchange() {
    return {
        type: PROCEED_INTERCHANGE
    }
}

// todo: Rewrite to saga. Because I can't test it

export function realizeInterchange() {
    return (dispatch, getState) => {
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
