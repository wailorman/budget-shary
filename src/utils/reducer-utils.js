import { Map, fromJS } from 'immutable';
import * as immutableConverter from './immutable-converter';
import get from 'lodash/get';

export const addWithDefaults = (defaultValues) => (state, action) => {
    if ( !action.id || state.get(action.id) ) return state;

    return state
        .set(action.id, Map({
            id: action.id,
            ...defaultValues
        }));
};

export const add = (state, action) => {
    return addWithDefaults(action.values)(state, action);
};

export const update = (state, action) => {

    if (!state.get(action.id)) return state;

    return state
        .mergeDeepIn([action.id], fromJS(action.values));

};

export const remove = (state, action) => {

    return state.delete(action.id);

};

export const fetch = (resultsPath, state, action) => {

    const results = get(action, resultsPath, {});

    return immutableConverter.nestedMap(results);

};