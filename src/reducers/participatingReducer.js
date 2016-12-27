import {initialState} from './initial-state';
import {
    FETCH_BUDGET,
    TOGGLE_PARTICIPATION,
    REMOVE_PRODUCT,
    REMOVE_PERSON
} from './../actions';

export function participatingReducer(state = {}, action = {}) {

    switch (action.type){
        case FETCH_BUDGET:
        {
            return {
                ...((action.result || {}).productParticipating || initialState.productParticipating)
            };
        }

        case TOGGLE_PARTICIPATION:
        {
            const {productId, personId} = action;

            return {
                ...state,
                [ productId ]: {
                    ...state[productId],
                    [ personId ]: !((state[productId] || {})[personId] || false)
                }
            };
        }

        case REMOVE_PRODUCT:
        {
            if (!state[action.id]) return state;

            return Object
                .keys(state)
                .filter(id => id != action.id)
                .reduce((result, currentId) => ({
                    ...result,
                    [currentId]: state[currentId]
                }), {});
        }

        case REMOVE_PERSON:
        {
            return Object
                .keys(state)
                .map(productId => {

                    const participatingElem = state[productId];

                    const res = Object
                        .keys(participatingElem)
                        .filter(personId => personId != action.id)
                        .reduce((result, currentId) => ({
                            ...result,
                            [currentId]: state[productId][currentId]
                        }), {});

                    return [productId, res];

                })
                .reduce((result, [currentId, res]) => ({
                    ...result,
                    [currentId]: res
                }), {});
        }

        default:
        {
            return state;
        }
    }

}