import {Map} from 'immutable';

import {createSelector} from 'reselect';
import {personsMapSelector} from './persons';

export const participatingSelector = (state) => state.productParticipating;

export const productParticipatingSelector = (productId) => createSelector(
    participatingSelector,
    personsMapSelector,

    (participating, persons) => {
        return participating
            .get(productId, Map())
            .map((participState, personId) => {
                const personName = persons.get(personId).name;
                // debugger;
                return [ personId, personName, participState ];
            })
            .toArray();
    }
);
