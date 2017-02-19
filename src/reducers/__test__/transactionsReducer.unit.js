import { transactionsReducer } from '../transactionsReducer';
import sinonSandbox from '../../../test/helpers/sinon-sandbox';
import * as reducerUtils from '../../utils/reducer-utils';
import {
    PROCEED_INTERCHANGE,
    FETCH_BUDGET
} from '../../actions';

import { fakeStateCase1, fakeStateCase1WithTransactions, normalizedBigFakeState } from '../../../test/fixtures/fake-state';

import { List, Map } from 'immutable';

const exampleArr = [
    { from: '1', to: '2', total: 611.4 },
    { from: '1', to: '3', total: 1144.4 }
];

const exampleList = List([
    Map({ from: '1', to: '2', total: 611.4 }),
    Map({ from: '1', to: '3', total: 1144.4 })
]);

describe("UNIT / Reducers / transactionsReducer", ()=> {

    let sandbox;

    sinonSandbox((sinon) => {
        sandbox = sinon;
    });

    describe("FETCH_BUDGET", () => {

        it(`should call reducer utils method`, () => {

            const spy = sandbox.spy(reducerUtils, "fetch");

            const action = {
                type: FETCH_BUDGET,
                id: 'budget1',
                result: { transactions: exampleArr }
            };

            transactionsReducer(List(), action);

            assert.ok(spy.calledOnce, "wasn't called");
            assert.ok(spy.calledWithExactly('result.transactions', List(), action));

        });

        it(`should correctly convert to List & Maps`, () => {

            const action = {
                type: FETCH_BUDGET,
                id: 'budget1',
                result: { transactions: exampleArr }
            };

            assert.equal(
                transactionsReducer(List(), action),
                exampleList
            );

        });

    });


    it(`should return [] (empty) state if no actions and no state passed`, () => {

        const action = undefined;
        const initialState = undefined;

        const expected = [];
        const actual = transactionsReducer(initialState, action);

        expect(actual).to.eql(expected);

    });

    describe("PROCEED_INTERCHANGE", () => {

        it(`should put interchange results`, () => {

            const action = {
                type: PROCEED_INTERCHANGE,
                meta: {
                    transactions: [
                        { from: '1', to: '2', total: 611.4 },
                        { from: '1', to: '3', total: 1144.4 }
                    ]
                }
            };

            assert.equal(
                transactionsReducer(List(), action),
                exampleList
            );

        });

        // todo should substitute

        // todo should call fetch

    });

});