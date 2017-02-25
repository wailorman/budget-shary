import { createSelector } from 'reselect';

export const budgetSelector = (state) => state.budget;

export const budgetNameSelector = createSelector(
    budgetSelector,
    (budget) => budget.get('name')
);
