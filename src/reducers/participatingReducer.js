import {
    FETCH_BUDGET,
    TOGGLE_PARTICIPATION,
    REMOVE_PRODUCT,
    REMOVE_PERSON
} from './../actions';

import * as Immutable from 'immutable';

export function participatingReducer(state = {}, action = {}) {

    switch (action.type){
        case FETCH_BUDGET:
        {
            return Immutable.Map(action.result.productParticipating).toJS();
        }

        case TOGGLE_PARTICIPATION:
        {
            const {productId, personId} = action;

            const stateMap = Immutable.Map(state)
                .map((participatingElem) => Immutable.Map(participatingElem));


            return stateMap.setIn(
                [productId, personId],
                !stateMap.getIn([productId, personId], true)
            ).toJS();
        }

        case REMOVE_PRODUCT:
        {
            return Immutable.Map(state)
                .filterNot((pElem, id) => id == action.id)
                .toJS();
        }

        case REMOVE_PERSON:
        {
            const stateMap = Immutable.Map(state)
                .map((participatingElem) => Immutable.Map(participatingElem));

            return stateMap
                .map((participatingElem) =>
                    participatingElem.filterNot((pElem, id) => id == action.id)
                )
                .toJS();
        }

        default:
        {
            return state;
        }
    }

}