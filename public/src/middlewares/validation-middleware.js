import {CHANGE_PERSON, CHANGE_PRODUCT} from '../actions'

import {validate} from '../core/validation';


export const validationMiddleware = (reducer) => (store) => (next) => (action) => {

    if (action.type == CHANGE_PRODUCT || action.type == CHANGE_PERSON) {

        let newAction = _.cloneDeep(action);

        const previousState = store.getState();

        const nextState = reducer(previousState, action);

        const validationResult = validate( nextState );

        if (_.isEmpty(validationResult) == false) {
            _.set(newAction, `meta.errors`, validationResult);
        }

        return next(newAction);

    }else{
        return next(action);
    }
};

export default validationMiddleware;