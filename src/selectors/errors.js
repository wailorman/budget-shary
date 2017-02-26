import { createSelector } from 'reselect';

export const errorsSelector = (state) => state.errors;

export const commonErrorsSelector = createSelector(
    errorsSelector,
    (errors) => errors.common.toJS()
);

export const productErrorsSelector = (productId) => createSelector(
    errorsSelector,
    (errors) => errors.getIn(['products', productId]).toJS()
);
