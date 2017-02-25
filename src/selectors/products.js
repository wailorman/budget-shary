import { createSelector } from 'reselect';

export const productsSelector = (state) => state.products.toArray();

export const productsListSelector = createSelector(
    productsSelector,
    (products) => products.map((product) => product.toJS())
);

export const ownProductsSelector = (personId) => createSelector(
    productsListSelector,
    (products) => products.filter((product) => product.ownerId == personId)
);

export const ownProductsIdsSelector = (personId) => createSelector(
    ownProductsSelector(personId),
    (products) => products.map((product) => product.id)
);

export const oneProductSelector = (productId) => createSelector(
    productsListSelector,
    (products) => products.filter((product) => product.id === productId)
);
