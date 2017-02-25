import { createSelector } from 'reselect';

export const personsSelector = (state) => state.persons.toArray();

export const personsMapSelector = (state) => state.persons;

export const personsListSelector = createSelector(
    personsSelector,
    (persons) => persons.map((person) => person.toJS())
);

export const onePersonSelector = (personId) => createSelector(
    personsListSelector,
    (persons) => persons.filter((person) => personId == person.id)
);
