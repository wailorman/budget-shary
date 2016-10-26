import {initialState} from './initial-state';
import {
    FETCH_BUDGET,
    TOGGLE_PARTICIPATION,
    REMOVE_PRODUCT,
    REMOVE_PERSON
} from './../actions';

export function participatingReducer(state = {}, action = {}) {

    let newState = _.cloneDeep(state);

    switch (action.type){
        case FETCH_BUDGET:
        {
            return _.get(action, 'result.productParticipating', initialState.productParticipating);
        }

        case TOGGLE_PARTICIPATION:
        {
            const {productId, personId} = action;

            if (!newState[action.productId])
                newState[productId] = {};

            newState[productId][personId] = !newState[productId][personId];

            return newState;
        }

        case REMOVE_PRODUCT:
        {
            delete newState[action.id];
            return newState;
        }

        case REMOVE_PERSON:
        {
            _.forIn(newState, (productParticipationElem)=> {
                delete productParticipationElem[action.id];
            });

            return newState;
        }

        default:
        {
            return newState;
        }
    }

}