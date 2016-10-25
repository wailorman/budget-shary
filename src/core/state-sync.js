import {stateStub} from '../state-stub';

export const STATE_KEY = 'budget1';

const localStorageStub = typeof window == 'undefined' ? require('localStorage') : window.localStorage;

/**
 * 
 * @param opts
 * @param opts.returnStubIfEmpty bool Returns state stub if user doesn't have his own state in localStorage
 * @param deps
 * @returns {*}
 */
export const fetchState = function (opts, deps = {}) {

    const {returnStubIfEmpty} = opts || {};
    
    _.defaultsDeep(deps, {localStorage: localStorageStub});

    const localStorageResponse = deps.localStorage.getItem(STATE_KEY);

    let jsonParsingResult;

    if (!localStorageResponse && returnStubIfEmpty){

        if (returnStubIfEmpty) {

            jsonParsingResult = stateStub;

        }

    }else{

        try {
            jsonParsingResult = JSON.parse(localStorageResponse);
        } catch (e) {
            console.error(`fetchState: JSON parsing error: '${e}'`);
            jsonParsingResult = null;
        }

    }

    return jsonParsingResult;

};

export const pushState = function (state, deps = {}) {

    _.defaultsDeep(deps, {localStorage: localStorageStub});

    const stringifyState = JSON.stringify(state);

    deps.localStorage.setItem(STATE_KEY, stringifyState);

    return JSON.parse(deps.localStorage.getItem(STATE_KEY));

};