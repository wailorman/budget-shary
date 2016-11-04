import {stateStub, generateBudget, STUB_BUDGET_ID} from '../state-stub';

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

    const budgets = _(allItems)
        .mapValues((item, name)=> {
            // Attach id if budget doesn't have .budget.id property

            const idNotDefined = !item.budget || (item.budget && !item.budget.id);

            if (idNotDefined) {
                const newId = name.match(/[^(budget)]+/)[0];
                _.set(item, 'budget.id', newId);
            }

            return item;
        })
        .filter((item, name)=> {
            return name.match(new RegExp(`^(${BUDGET_NAME_PREFIX})`));
        })
        .value();

    const normalizedBudgets = _.mapKeys(budgets, budget => budget.budget.id );

    return _.mapValues(normalizedBudgets, (budget)=> {
        return {
            id: budget.budget.id,
            name: budget.budget.name || ''
        };
    });

};

export const createBudget = function (deps = {}) {

    _.defaultsDeep(deps, {pushBudget: pushBudget});

    const budgetStateToPush = generateBudget();

    return deps.pushBudget(budgetStateToPush);

};

export const deleteBudget = function (id, deps = {}) {

    _.defaultsDeep(deps, {store: store});

    const prefixedId = BUDGET_NAME_PREFIX + id;

    if (!id){
        console.error(`Missing id argument`);
        return false;
    }

    const budgetToDelete = store.get(prefixedId);

    if (!budgetToDelete){
        return false;
    }

    store.remove(prefixedId);

    return true;

};