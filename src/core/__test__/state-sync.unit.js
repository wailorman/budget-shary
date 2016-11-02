import {fetchBudget, pushBudget, BUDGET_NAME_PREFIX} from '../state-sync';
import {STUB_BUDGET_ID} from '../../state-stub';
import {fakeState} from '../../../test/fixtures/fake-state';
import {stateStub} from '../../state-stub';

describe("UNIT / Core / Storage Sync", ()=> {

    const deps = {
        store
    };

    beforeEach(()=> {
        store.clear();
    });

    afterEach(()=> {
        store.clear();
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

});