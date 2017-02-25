import { createSelector } from 'reselect';

export const personsSelector = (state) => state.persons;

export const personsListSelector = createSelector(
    personsSelector,
    (persons) => persons.toArray()
);
