import {stateStub} from '../state-stub';

export const DEFAULT_BUDGET_ID = 'budget1';

const localStorageStub = typeof window == 'undefined' ? require('localStorage') : window.localStorage;

/**
 * 
 * @param opts
 * @param opts.returnStubIfEmpty bool Returns state stub if user doesn't have his own state in localStorage
 * @param deps
 * @returns {*}
 */
export const fetchBudget = function (
    {returnStubIfEmpty = false, id = DEFAULT_BUDGET_ID},
    deps = {}
) {


    
    _.defaultsDeep(deps, {localStorage: localStorageStub});

    const localStorageResponse = deps.localStorage.getItem(id);

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

export const pushBudget = function (
    state,
    {id = DEFAULT_BUDGET_ID},
    deps = {}
) {

    _.defaultsDeep(deps, {localStorage: localStorageStub});

    const stringifyState = JSON.stringify(state);

    deps.localStorage.setItem(id, stringifyState);

    return JSON.parse(deps.localStorage.getItem(id));

};