export const REMOVE_PRODUCT = 'REMOVE_PRODUCT';
export const NEW_PRODUCT = 'NEW_PRODUCT';
export const CHANGE_PRODUCT = 'CHANGE_PRODUCT';

export function removeProduct(id) {
    return {
        type: REMOVE_PRODUCT,
        id
    }
}

export function newProduct() {
    return {
        type: NEW_PRODUCT
    }
}

export function changeProduct(id, values) {
    return {
        type: CHANGE_PRODUCT,
        id,
        values
    }
}