import {
    fetchBudget,
    pushBudget,
    getBudgetsList,
    deleteBudget,
    BUDGET_NAME_PREFIX
} from '../state-sync';

import {STUB_BUDGET_ID} from '../../state-stub';
import {stateStub} from '../../state-stub';
import fakeBudgets from './state-sync-fixtures';

const fakeState = fakeBudgets[0];

describe("UNIT / Core / Storage Sync", ()=> {

    let sandbox;

    const deps = {
        store
    };

    beforeEach(()=> {
        store.clear();
    });

    afterEach(()=> {
        store.clear();
    });


    beforeEach(()=> {

        sandbox = sinon.sandbox.create();

        sandbox.stub(console, 'log');
        sandbox.stub(console, 'error');
        sandbox.stub(console, 'info');
        sandbox.stub(console, 'warn');
    });

    afterEach(()=> {
        sandbox.restore();
    });


    const writeBudgetToStore = (id, state) => {
        store.set(BUDGET_NAME_PREFIX + id, state);
    };

    describe("#fetchBudget()", ()=> {

        it(`should return undefined if id isn't specified`, () => {

            // todo: Check the console
            const actual = fetchBudget({}, deps);

            const expected = undefined;

            expect(actual).to.eql(expected);

        });

        it(`should return budget by id`, () => {

            writeBudgetToStore(1, fakeState);

            const actual = fetchBudget({id: 1}, deps);

            expect(actual).to.eql(fakeState);

        });

        it(`should return undefined if requested budget doesn't exist`, () => {

            store.clear();

            // todo: Check the console
            const actual = fetchBudget({id: 101}, deps);

            expect(actual).to.eql(undefined);

        });

        it(`should return budget stub if requested budgetId is '${STUB_BUDGET_ID}'`, () => {

            const actual = fetchBudget({id: STUB_BUDGET_ID}, deps);

            const expected = stateStub;

            expect(actual).to.eql(expected);

        });

        it(`should add .id prop to budget if it's not`, () => {

            const budgetWithoutId = {
                budget: {
                    name: 'Some name'
                }
            };

            writeBudgetToStore(1, budgetWithoutId);

            const expectedBudget = {
                budget: {
                    id: 1,
                    name: 'Some name'
                }
            };

            const actual = fetchBudget({id: 1}, deps);

            expect(actual).to.eql(expectedBudget);

        });

    });

    describe("#pushBudget()", ()=> {

        it(`should throw exception if we are pushing empty={} budget`, () => {

            expect(
                pushBudget.bind(null, {}, deps)
            ).to.throw(/doesn't have a \.budget property/);

        });

        it(`should return the same budget we passed`, () => {

            const actual = pushBudget(fakeState, deps);

            expect(actual).to.eql(fakeState);

        });

        it(`should push budget by id`, () => {

            pushBudget(fakeState, deps);

            expect(_.keys(store.getAll()).length).to.eql(1);

            const pushedBudget = store.get('budget_b_1');

            expect(pushedBudget).to.eql(fakeState);

        });

    });

    describe("#getBudgetsList()", ()=> {

        beforeEach(()=> {

            _.forEach(fakeBudgets, (budget)=> {

                const itemName = BUDGET_NAME_PREFIX + budget.budget.id;

                store.set(itemName, budget);

            });

        });

        it(`should return ${fakeBudgets.length} budgets`, () => {

            expect(_.keys(getBudgetsList(deps)).length).to.eql(fakeBudgets.length);

        });

        it(`should use items w/ prefix ${BUDGET_NAME_PREFIX} only`, () => {

            store.set('itsNotABudget', {});

            expect(_.keys(getBudgetsList(deps)).length).to.eql(fakeBudgets.length);

        });
        
        it(`should return object with budgets ids props`, () => {

            const result = getBudgetsList(deps);

            const fakeBudgetsIds = _.map(fakeBudgets, 'budget.id');

            expect(_.keys(result)).to.eql(fakeBudgetsIds);

        });
        
        it(`should return objects with .id & .name prop`, () => {

            const result = getBudgetsList(deps);

            const firstBudget = result[_.keys(result)[0]];

            expect(_.keys(firstBudget)).to.eql(['id', 'name']);

        });

        it(`should attach .id to .budget prop if it's not defined`, () => {

            store.clear();

            const budget = {
                budget: {
                    name: 'some name'
                }
            };

            store.set('budget1', budget);

            const result = getBudgetsList(deps);

            const expected = {
                1: {
                    id: '1',
                    name: 'some name'
                }
            };

            expect(result).to.eql(expected);

        });

        it(`should attach .id & .name even if .budget isn't defined`, () => {

            store.clear();

            const budget = {};

            store.set('budget1', budget);

            const result = getBudgetsList(deps);

            const expected = {
                1: {
                    id: '1',
                    name: ''
                }
            };

            expect(result).to.eql(expected);

        });

    });

    describe("#deleteBudget()", ()=> {

        beforeEach(()=> {

            _.forEach(fakeBudgets, (budget)=> {

                const itemName = BUDGET_NAME_PREFIX + budget.budget.id;

                store.set(itemName, budget);

            });

        });

        it(`should return false if requested budget doesn't exist`, () => {

            expect(deleteBudget('nonexistentBudget')).to.eql(false);

        });

        it(`should return true if budget was successfully deleted`, () => {

            const deletingBudgetId = fakeBudgets[0].budget.id;

            expect(deleteBudget(deletingBudgetId)).to.eql(true);

        });

        it(`should really delete it from localStorage`, () => {

            const deletingBudgetId = fakeBudgets[0].budget.id;

            deleteBudget(deletingBudgetId);

            expect(_.keys(store.getAll()).length).to.eql(fakeBudgets.length - 1);

            const remainingBudgetsIdsInLocalStorage = _.map(store.getAll(), 'budget.id');

            const budgetsIdsExceptDeleted = _(fakeBudgets)
                .filter((budget) => {
                    return budget.budget.id != deletingBudgetId;
                })
                .map('budget.id')
                .value();

            expect(remainingBudgetsIdsInLocalStorage).to.eql(budgetsIdsExceptDeleted);

        });

        it(`should warn & return false if id didn't passed`, () => {

            expect(deleteBudget()).to.eql(false);

            expect(console.error.called).to.eql(true);

        });

    });

});