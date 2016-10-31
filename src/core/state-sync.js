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

    if (id != DEFAULT_BUDGET_ID) id = `budget${id}`;
    
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

export const pushBudget = function (state, deps = {}) {

    // todo: Specify budget in error message
    if (!state.budget)
        throw new Error(`Budget's state doesn't have a .budget property`);
    if (!state.budget.id)
        throw new Error(`Budget doesn't have an id`);

    const budgetId = 'budget' + state.budget.id;


    _.defaultsDeep(deps, {localStorage: localStorageStub});

    const stringifyState = JSON.stringify(state);

    deps.localStorage.setItem(budgetId, stringifyState);

    return JSON.parse(deps.localStorage.getItem(budgetId));

};