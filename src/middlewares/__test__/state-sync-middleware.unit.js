import {stateSyncMiddleware} from '../state-sync-middleware';
import {BUDGET_NAME_PREFIX} from '../../core/state-sync';
import {FETCH_BUDGET} from '../../actions';
import localStorage from '../../../test/requirements/local-storage';
import * as actions from '../../actions';

// todo: Rewrite test to unit!

describe("UNIT / Middlewares / state sync middleware", ()=> {

    let sandbox;

    beforeEach(()=> {

        sandbox = sinon.sandbox.create();

    });

    afterEach(()=> {
        sandbox.restore();
    });



    // Returns mutated action
    const callMiddleware = (action, deps)=> {

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

        return stateSyncMiddleware(reducer, deps)(store)(next)(action);

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
                id: 2,
                products: [1]
            };

            store.set(BUDGET_NAME_PREFIX + budget.id, budget);

            const action = {
                type: FETCH_BUDGET,
                id: 2
            };

            const actual = callMiddleware(action);

            const expected = {
                ...action,
                result: budget
            };

            expect(actual).to.eql(expected);

        });

    });

    describe("Syncing budget actions", ()=> {

        let middlewareDeps, actionsToPush, actionsToNotPush;

        before(()=> {

            actionsToPush = actions.budgetSyncActions;
            actionsToNotPush = _.filter(actions,
                action => {
                    return typeof action == 'string' && (actions.budgetSyncActions.indexOf(action) < 0);
                }
            );

        });

        beforeEach(()=> {

            middlewareDeps = {
                pushBudget: sandbox.stub(),
                fetchBudget: sandbox.stub()
            };

        });

        _.forEach(actionsToPush, (action)=> {

            it(`should push budget state if passed ${action} action`, () => {

                callMiddleware({type: action}, middlewareDeps);

                expect(middlewareDeps.pushBudget.called).to.eql(true);

            });

        });

        _.forEach(actionsToNotPush, (action)=> {

            it(`should not push budget state if passed ${action} action`, () => {

                callMiddleware({type: action}, middlewareDeps);

                expect(middlewareDeps.pushBudget.called).to.eql(false);

            });

        });

    });

});