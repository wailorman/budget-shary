import {sumAllShares} from '../core/interchange/interchange-utils'
import {CHANGE_PERSON} from '../actions'

export const shareSumMiddleware = (reducer) => (store) => (next) => (action) => {

    if (action.type != CHANGE_PERSON) return next(action);
    

    const nextState = reducer(store.getState(), action);

    const newShareSum = sumAllShares(nextState.persons).toString();

    let newAction = _.cloneDeep(action);

    _.set(newAction, 'meta.newShareSum', newShareSum);

    return next(newAction);
    
};