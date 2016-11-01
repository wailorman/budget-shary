import {
    FETCH_BUDGET,
    REMOVE_PERSON,
    NEW_PERSON,
    CHANGE_PERSON,
    TOGGLE_PARTICIPATION
} from '../actions';

import {initialState} from './initial-state';

export function personsReducer(personsState = initialState.persons, action) {
    let newState = _.cloneDeep(personsState);

    switch (action.type) {

        case FETCH_BUDGET:
        {
            return _.get(action, 'result.persons', initialState.persons);
        }

        case REMOVE_PERSON:
        {
            delete newState[action.id];

            return newState;
        }

        case NEW_PERSON:
        {
            const newPersonId = _.uniqueId('_person_');

            newState[newPersonId] = {id: newPersonId, name: '', share: ''};

            return newState;
        }

        case CHANGE_PERSON:
        {
            if (!newState[action.id]) return newState;

            const consideringPerson = _.cloneDeep(newState[action.id]);

            newState[action.id] = _.assign(consideringPerson, action.values);

            return newState;
        }

        case TOGGLE_PARTICIPATION:
        {
            if (action.meta && action.meta.newPersonShares) {

                _.forOwn(newState, (person, personId)=> {
                    person.share = action.meta.newPersonShares[personId] || 0;
                });

            }

            return newState;
        }

        default:
        {
            return personsState;
        }
    }

}