import {fetchBudget, pushBudget, DEFAULT_BUDGET_ID} from '../state-sync';
import {fakeState} from '../../../test/fixtures/fake-state';
import {stateStub} from '../../state-stub';

const localStorage = typeof window == 'undefined' ? require('localStorage') : window.localStorage;

describe("UNIT / Core / Storage Sync", ()=> {

    const deps = {
        localStorage
    };

    beforeEach(()=> {
        localStorage.clear();
    });

    afterEach(()=> {
        localStorage.clear();
    });

    describe("#fetchBudget()", ()=> {

        it(`should return null as last state if we are newbie`, () => {

            const actual = fetchBudget({}, deps);

            const expected = null;

            expect(actual).to.eql(expected);

        });

        it(`should return some state if we already save some work`, () => {

            localStorage.setItem(DEFAULT_BUDGET_ID, JSON.stringify(fakeState));

            const actual = fetchBudget({}, deps);

            expect(actual).to.eql(fakeState);

        });

        it(`should return null if json string in storage isn't valid`, () => {

            localStorage.setItem(DEFAULT_BUDGET_ID, '{"foo:');

            const actual = fetchBudget({}, deps);

            const expected = null;

            expect(actual).to.eql(expected);

        });
        
        it(`should return state stub if localStorage is empty`, () => {

            localStorage.clear();

            const actual = fetchBudget({returnStubIfEmpty: true}, deps);

            expect(actual).to.eql(stateStub);
            
        });

        it(`should not return state stub if we have actual state`, () => {

            localStorage.setItem(DEFAULT_BUDGET_ID, JSON.stringify(fakeState));

            const actual = fetchBudget({returnStubIfEmpty: true}, deps);

            expect(actual).to.eql(fakeState);

        });

        it(`should return budget by id`, () => {

            localStorage.setItem('budget2', JSON.stringify(fakeState));

            const actual = fetchBudget({id: 2, returnStubIfEmpty: true}, deps);

            expect(actual).to.eql(fakeState);

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

            expect(localStorage.length).to.eql(0);

            pushBudget(fakeState2, deps);

            expect(localStorage.length).to.eql(1);

            const pushedBudget = JSON.parse( localStorage.getItem('budget2') );

            expect(pushedBudget).to.eql(fakeState2);

        });

    });

});