import {stateStub} from '../state-stub';

// for localStorage testers
export const DEFAULT_TEST_BUDGET_ID = 'budget1';
export const BUDGET_NAME_PREFIX = 'budget';
export const DEFAULT_BUDGET_ID = 1;
export const STUB_BUDGET_ID = 'stub';

const localStorageStub = typeof window == 'undefined' ? require('localStorage') : window.localStorage;

/**
 * 
 * @param opts
 * @param opts.returnStubIfEmpty bool Returns state stub if user doesn't have his own state in localStorage
 * @param deps
 * @returns {*}
 */
export const fetchBudget = function (
    {id},
    deps = {}
) {

    if (!id){
        console.error(`fetchBudget: id argument wasn't passed`);
        return null;
    }

    const returnStubIfEmpty = id == STUB_BUDGET_ID ? true : false;
    const localStorageBudgetId = BUDGET_NAME_PREFIX + id;

    _.defaultsDeep(deps, {localStorage: localStorageStub});

    const response = deps.localStorage.getItem(localStorageBudgetId);

    let jsonParsingResult;

    if (!response && returnStubIfEmpty){

        jsonParsingResult = stateStub;

    }else{

        try {
            jsonParsingResult = JSON.parse(response);
        } catch (e) {
            console.error(`fetchState: JSON parsing error: `, e);
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

    const localStorageBudgetId = BUDGET_NAME_PREFIX + state.budget.id;

    _.defaultsDeep(deps, {localStorage: localStorageStub});

    const stringifyState = JSON.stringify(state);

    deps.localStorage.setItem(localStorageBudgetId, stringifyState);

    return JSON.parse(deps.localStorage.getItem(localStorageBudgetId));

};