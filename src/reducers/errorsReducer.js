import {initialState} from './initial-state';

export function errorsReducer(state = initialState.errors, action = {}) {

    if (action.meta && action.meta.errors) {
        return action.meta.errors;
    } else {

        // clearing errors state
        if (_.isEqual(state, initialState.errors))
            return state;
        else
            return initialState.errors;
    }

}