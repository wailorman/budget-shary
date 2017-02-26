import { createSelector } from 'reselect';

export const personsSelector = (state) => state.persons;

// export const personsMapSelector = (state) => state.persons;
//
// export const personsListSelector = createSelector(
//     personsSelector,
//     (persons) => persons.map((person) => person.toJS())
// );

export const personsIdsSelector = createSelector(
    personsSelector,
    (persons) => Object.keys( persons.toObject() )
);

export const onePersonSelector = (personId) => createSelector(
    personsSelector,
    (persons) => persons.get(personId).toJS()
);
