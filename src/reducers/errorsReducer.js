import {initialState} from './initial-state';
import { nestedMap } from '../utils/immutable-converter';

export function errorsReducer(state = initialState.errors, action = {}) {

    if (action.meta && action.meta.errors) {
        return nestedMap(action.meta.errors);
    } else {
        return initialState.errors;
    }

}