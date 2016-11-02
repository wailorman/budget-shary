import {
    fetchBudget,
    pushBudget,
    getBudgetsList,
    BUDGET_NAME_PREFIX
} from '../state-sync';

import {STUB_BUDGET_ID} from '../../state-stub';
import {fakeState} from '../../../test/fixtures/fake-state';
import {stateStub} from '../../state-stub';
import fakeBudgets from './state-sync-fixtures';

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

    });

    describe("#pushBudget()", ()=> {

        it(`should throw exception if we are pushing empty={} budget`, () => {

            expect(
                pushBudget.bind(null, {}, deps)
            ).to.throw(/doesn't have a \.budget property/);

        });

        it(`should return the same budget we passed`, () => {

            let fakeState2 = _.cloneDeep(fakeState);
            fakeState2.budget = {id: 1, name: 'budget'};

            const actual = pushBudget(fakeState2, deps);

            expect(actual).to.eql(fakeState2);

        });

        it(`should push budget by id`, () => {

            let fakeState2 = _.cloneDeep(fakeState);
            fakeState2.budget = {id: 2, name: 'budget'};

            expect(_.keys(store.getAll()).length).to.eql(0);

            pushBudget(fakeState2, deps);

            expect(_.keys(store.getAll()).length).to.eql(1);

            const pushedBudget = store.get('budget2');

            expect(pushedBudget).to.eql(fakeState2);

        });

    });

    describe("#getBudgetsList()", ()=> {

        beforeEach(()=> {

            _.forEach(fakeBudgets, (budget)=> {

                const itemName = BUDGET_NAME_PREFIX + budget.budget.id;
                const stringBudgetJson = JSON.stringify(budget);

                localStorage.setItem(itemName, stringBudgetJson);

            });

        });

        it(`should return ${fakeBudgets.length} budgets`, () => {

            expect(_.keys(getBudgetsList(deps)).length).to.eql(fakeBudgets.length);

        });

        it(`should use items w/ prefix ${BUDGET_NAME_PREFIX} only`, () => {

            localStorage.setItem('itsNotABudget', '{}');

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

    });

});