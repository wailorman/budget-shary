export const REMOVE_PRODUCT = 'REMOVE_PRODUCT';

export function removeProduct(id) {
    return {
        type: REMOVE_PRODUCT,
        id
    }
}