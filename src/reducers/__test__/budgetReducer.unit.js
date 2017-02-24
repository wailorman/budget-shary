import {budgetReducer} from '../budgetReducer';
import { Map } from 'immutable';
import {CHANGE_BUDGET_PROPS, FETCH_BUDGET} from '../../actions';
import sinonSandbox from '../../../test/helpers/sinon-sandbox';
import * as reducerUtils from '../../utils/reducer-utils';

const exampleObj = {
    id: 'budget1',
    name: 'Budget!'
};

const exampleMap = Map({
    id: 'budget1',
    name: 'Budget!'
});

describe("UNIT / Reducers / budgetReducer", ()=> {

    let sandbox;

    sinonSandbox((sinon) => {
        sandbox = sinon;
    });

    it(`should return initial state if no action passed`, () => {

        const state = {};

        const actual = budgetReducer(state);

        expect(actual).to.eql(state);

    });

    describe("FETCH_BUDGET", ()=> {

        it(`should call reducer utils method`, () => {

            const spy = sandbox.spy(reducerUtils, "fetch");

            const action = {
                type: FETCH_BUDGET,
                id: 'budget1',
                result: { budget: exampleObj }
            };

            budgetReducer(exampleMap, action);

            assert.ok(spy.calledOnce, "wasn't called");
            assert.ok(spy.calledWithExactly('result.budget', exampleMap, action));

        });

    });

    describe("CHANGE_BUDGET_PROPS", ()=> {

        it('should call reducerUtils method', () => {

            const spy = sandbox.spy(reducerUtils, "update");

            const action = {
                type: CHANGE_BUDGET_PROPS,
                values: {
                    name: 'Another name'
                }
            };

            budgetReducer(exampleMap, action);

            assert.ok( spy.calledOnce, "wasn't called" );
            assert.ok( spy.calledWithExactly(exampleMap, action), "wrong arguments" );

        });

    });

});
