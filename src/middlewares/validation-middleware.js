import {FETCH_BUDGET} from '../actions';

import {validate} from '../core/validation/validation';


export const validationMiddleware = (reducer) => (store) => (next) => (action) => {

    const getActionWithValidationResult = (state, action)=> {

        let newAction = _.cloneDeep(action);

        const validationResult = validate(state);

        if (_.isEmpty(validationResult) == false) {
            _.set(newAction, `meta.errors`, validationResult);
        }

        return newAction;

    };

    let nextState, previousState;

    if (action.type == FETCH_BUDGET && action.result) {
        previousState = action.result;
    } else {
        previousState = store.getState();
    }

    nextState = reducer(previousState, action);

    const newAction = getActionWithValidationResult(nextState, action);

    return next(newAction);

};

export default validationMiddleware;