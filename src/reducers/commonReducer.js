import {initialState} from './initial-state';

import {
    FETCH_BUDGET
} from '../actions';


export function commonReducer(commonState = {}, action = {}) {
    let newCommonState = _.cloneDeep(commonState);

    switch (action.type) {
        case FETCH_BUDGET:
        {
            return _.get(action, 'result.common', initialState.common);
        }
        default:
        {
            if (action.meta && action.meta.newShareSum) {
                newCommonState.shareSum = action.meta.newShareSum;
                return newCommonState;
            } else {
                return commonState;
            }
        }

    }

}