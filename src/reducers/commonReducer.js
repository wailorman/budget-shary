import {initialState} from './initial-state'

import {
    FETCH_BUDGET,
    UPDATE_SHARE_SUM
} from '../actions'


export function commonReducer(commonState = {}, action = {}) {
    let newCommonState = _.cloneDeep(commonState);

    switch (action.type) {
        case FETCH_BUDGET:

            if (action.result && action.result.common){
                newCommonState = action.result.common;
                return newCommonState;
            }else{
                return initialState.common;
            }

        case UPDATE_SHARE_SUM:
            newCommonState.shareSum = action.value || commonState.shareSum;
            return newCommonState;
        default:

            if (action.meta && action.meta.newShareSum) {
                newCommonState.shareSum = action.meta.newShareSum;
                return newCommonState;
            } else {
                return commonState;
            }

    }

}