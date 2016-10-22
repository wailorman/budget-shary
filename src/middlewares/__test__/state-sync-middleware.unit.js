import {stateSyncMiddleware} from '../state-sync-middleware'
import {FETCH_BUDGET} from '../../actions'
import localStorage from '../../../test/requirements/local-storage'

describe("UNIT / Middlewares / state sync middleware", ()=> {

    // Returns mutated action
    const callMiddleware = (action)=> {

        const next = (action)=> {
            return action;
        };

        const reducer = (state)=> {
            return state;
        };

        const store = {
            getState(){
                return {};
            }
        };

        return stateSyncMiddleware(reducer)(store)(next)(action);

    };

    describe("FETCH_BUDGET", ()=> {

        beforeEach(()=> {
            localStorage.clear();
        });

        afterEach(()=> {
            localStorage.clear();
        });

        it(`should not mutate action if it's not FETCH_BUDGET`, () => {

            const action = {
                type: 'SOME_ACTION_',
                id: '1'
            };

            const actual = callMiddleware(action);

            expect(actual).to.eql(action);

        });

        it(`should attach budget to action when FETCH_BUDGET`, () => {

            const budget = {
                id: 'budget1',
                products: [1]
            };

            localStorage.setItem(budget.id, JSON.stringify(budget));

            const action = {
                type: FETCH_BUDGET,
                id: 'budget1'
            };

            const actual = callMiddleware(action);

            const expected = {
                ...action,
                result: budget
            };

            expect(actual).to.eql(expected);

        });

    });

});