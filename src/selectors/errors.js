import { createSelector } from 'reselect';
import {Map} from 'immutable';

export const errorsSelector = (state) => state.errors;

export const errorsByPathSelector = (path) => (errors) => {
    const arrayPath = [].concat(
        typeof path == 'string' ? path.split('.') : path
    );

    return errors.getIn(arrayPath, Map()).toJS();
};

export const commonErrorsSelector = createSelector(
    errorsSelector,
    errorsByPathSelector('common')
);

export const productErrorsSelector = (productId) => createSelector(
    errorsSelector,
    errorsByPathSelector(['products', productId])
);

export const personErrorsSelector = (personId) => createSelector(
    errorsSelector,
    errorsByPathSelector(['persons', personId])
);
