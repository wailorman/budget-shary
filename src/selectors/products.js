import { createSelector } from 'reselect';

export const productsSelector = (state) => state.products;

export const productsListSelector = createSelector(
    productsSelector,
    (products) => products.map((product) => product.toJS())
);

export const ownProductsSelector = (personId) => createSelector(
    productsListSelector,
    (products) => products.filter((product) => product.ownerId == personId)
);

export const ownProductsIdsSelector = (personId) => createSelector(
    productsSelector,
    (products) => Object.keys(
                    products
                        .filter((product) => product.get('ownerId') == personId)
                        .toObject()
                  )
);

export const oneProductSelector = (productId) => createSelector(
    productsSelector,
    (products) => products.get(productId).toJS()
);

export const productsIdsSelector = createSelector(
    productsSelector,
    (products) => Object.keys( products.toObject() )
);
