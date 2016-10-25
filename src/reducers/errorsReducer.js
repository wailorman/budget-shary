import {initialState} from './initial-state';

export function errorsReducer(state = {}, action = {}) {

    if (action.meta && action.meta.errors) {
        return action.meta.errors;
    } else {
        return initialState.errors;
    }

}