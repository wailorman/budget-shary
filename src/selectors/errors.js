import { createSelector } from 'reselect';

export const errorsSelector = (state) => state.errors;

export const commonErrorsSelector = createSelector(
    errorsSelector,
    (errors) => errors.common
);
