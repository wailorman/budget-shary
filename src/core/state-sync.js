import {stateStub, STUB_BUDGET_ID} from '../state-stub';

// for localStorage testers
export const DEFAULT_TEST_BUDGET_ID = 'budget1';
export const BUDGET_NAME_PREFIX = 'budget';
export const DEFAULT_BUDGET_ID = 1;

// const localStorageStub = typeof window == 'undefined' ? require('localStorage') : window.localStorage;

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
        return undefined;
    }

    const returnStub = id == STUB_BUDGET_ID ? true : false;
    const storeBudgetId = BUDGET_NAME_PREFIX + id;

    _.defaultsDeep(deps, {store: store});

    let response = deps.store.get(storeBudgetId);

    if (!response){
        response = returnStub ? stateStub : undefined;
    }

    return response;

};

export const pushBudget = function (state, deps = {}) {

    // todo: Specify budget in error message
    if (!state.budget)
        throw new Error(`Budget's state doesn't have a .budget property`);
    if (!state.budget.id)
        throw new Error(`Budget doesn't have an id`);

    const storeBudgetId = BUDGET_NAME_PREFIX + state.budget.id;

    _.defaultsDeep(deps, {store: store});

    deps.store.set(storeBudgetId, state);

    return deps.store.get(storeBudgetId);

};

export const getBudgetsList = function (deps = {}) {

    _.defaultsDeep(deps, {store: store});

    const allItems = deps.store.getAll();

    const budgets = _.filter(
        allItems,
        (item, name)=> {
            console.log(item);
            return name.match(new RegExp(`^(${BUDGET_NAME_PREFIX})`));
        }
    );

    const normalizedBudgets = _.mapKeys(budgets, budget => budget.budget.id );

    return _.mapValues(normalizedBudgets, (budget)=> {
        return {
            id: budget.budget.id,
            name: budget.budget.name
        };
    });

};