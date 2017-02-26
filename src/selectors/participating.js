import {createSelector} from 'reselect';
import {personsSelector} from './persons';

export const participatingSelector = (state) => state.productParticipating;

export const productParticipatingSelector = (productId) => createSelector(
    participatingSelector,
    personsSelector,

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
