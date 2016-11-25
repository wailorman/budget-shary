import {
    FETCH_BUDGET,
    REMOVE_PERSON,
    NEW_PERSON,
    CHANGE_PERSON,
    TOGGLE_PARTICIPATION
} from '../actions';

import {initialState} from './initial-state';

export function personsReducer(state = initialState.persons, action = {}) {
    let newState = _.cloneDeep(state);

    switch (action.type) {

        case FETCH_BUDGET:
        {
            return _.get(action, 'result.persons', initialState.persons);
        }

        case REMOVE_PERSON:
        {
            if (newState[action.id]) {
                delete newState[action.id];
                return newState;
            }else{
                return state;
            }
        }

        case NEW_PERSON:
        {
            const newPersonId = _.uniqueId('_person_');

            newState[newPersonId] = {id: newPersonId, name: '', share: ''};

            return newState;
        }

        case CHANGE_PERSON:
        {
            if (!newState[action.id]) return state;

            const consideringPerson = newState[action.id];

            const isValuesOld = _.reduce(
                action.values,
                (isPreviousOld, value, key) => isPreviousOld || value == consideringPerson[key],
                false // <- isPreviousOld
            );

            if (isValuesOld) return state;

            newState[action.id] = _.assign(consideringPerson, action.values);

            return newState;
        }

        case TOGGLE_PARTICIPATION:
        {
            if (
                action.meta && action.meta.newPersonShares &&
                action.productId && action.personId
            ) {

                _.forOwn(newState, (person, personId)=> {
                    person.share = action.meta.newPersonShares[personId] || 0;
                });

                return newState;

            }

            return state;
        }

        default:
        {
            return state;
        }
    }

}