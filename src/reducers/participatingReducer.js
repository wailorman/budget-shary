import {
    FETCH_BUDGET,
    TOGGLE_PARTICIPATION,
    REMOVE_PRODUCT,
    REMOVE_PERSON
} from './../actions';

import * as reducerUtils from '../utils/reducer-utils';
import { initialState } from './initial-state';

export function participatingReducer(state = initialState.productParticipating, action = {}) {

    switch (action.type){
        case FETCH_BUDGET:
        {
            return reducerUtils.fetch('result.productParticipating', state, action);
        }

        case TOGGLE_PARTICIPATION:
        {
            const {productId, personId} = action;

            if (!productId || !personId) return state;

            return state.setIn(
                [productId, personId],
                !state.getIn([productId, personId], false)
            );
        }

        case REMOVE_PRODUCT:
        {
            return state
                .filter((pElem, id) => id != action.id);
        }

        case REMOVE_PERSON:
        {
            return state
                .map((pElem) =>
                    pElem.filter((participState, personId) => personId != action.id) );
        }

        default:
        {
            return state;
        }
    }

}