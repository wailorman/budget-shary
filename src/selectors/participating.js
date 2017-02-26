import {createSelector} from 'reselect';
import {personsMapSelector} from './persons';

export const participatingSelector = (state) => state.productParticipating;

export const productParticipatingSelector = (productId) => createSelector(
    participatingSelector,
    personsMapSelector,

    (participating, persons) => {
        const res = persons
            .map((person, personId) => {
                const participState = participating.getIn([productId, personId], false);

                return [ personId, person.get('name'), participState ];
            })
            .toArray();

        return res;
    }
);
