export const REMOVE_PRODUCT = 'REMOVE_PRODUCT';
export const NEW_PRODUCT = 'NEW_PRODUCT';
export const CHANGE_PRODUCT = 'CHANGE_PRODUCT';

export const REMOVE_PERSON = 'REMOVE_PERSON';
export const NEW_PERSON = 'NEW_PERSON';
export const CHANGE_PERSON = 'CHANGE_PERSON';

export const PROCEED_INTERCHANGE = 'PROCEED_INTERCHANGE';

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