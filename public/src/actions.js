export const REMOVE_PRODUCT = 'REMOVE_PRODUCT';
export const NEW_PRODUCT = 'NEW_PRODUCT';

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