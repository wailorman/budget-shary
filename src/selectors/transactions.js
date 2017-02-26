import { createSelector } from 'reselect';

export const transactionsSelector = (state) => state.transactions;

export const transactionsArraySelector = createSelector(
    transactionsSelector,
    (transactions) => transactions.toJS()
);
