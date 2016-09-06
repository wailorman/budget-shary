import { transactionsReducer, combinedReducers } from '../../../src/reducer'

import {

    PROCEED_INTERCHANGE,
    PUT_INTERCHANGE_RESULTS, DISPLAY_INTERCHANGE_ERROR,

    realizeInterchange,

    FETCH_BUDGET

} from '../../../src/actions'

import { fakeStateCase1, fakeStateCase1WithTransactions, normalizedBigFakeState } from '../../fixtures/fake-state'
import { humanifyTransactions } from '../../../src/core/interchange-utils'

describe("UNIT / Reducers / transactionsReducer", ()=> {


    describe("FETCH_BUDGET", ()=> {

        it(`should return clean state if .result wasn't attached to action`, () => {

            const action = {
                type: FETCH_BUDGET,
                id: 'budget1'
            };

            const expected = [];

            const actual = transactionsReducer({}, action);

            expect(actual).to.eql(expected);

        });

        it(`should return transactions if .result is attached`, () => {

            const action = {
                type: FETCH_BUDGET,
                id: 'budget1',
                result: normalizedBigFakeState
            };

            const expected = normalizedBigFakeState.transactions;

            const actual = transactionsReducer({}, action);

            expect(actual).to.eql(expected);

        });

        it(`should clean previous state if .result wasn't attached`, () => {

            const action = {
                type: FETCH_BUDGET,
                id: 'budget1'
            };

            const expected = [];

            const actual = transactionsReducer(normalizedBigFakeState.transactions, action);

            expect(actual).to.eql(expected);

        });

    });


    it(`should return [] (empty) state if no actions and no state passed`, () => {

        const action = undefined;
        const initialState = undefined;

        // debugger;

        const expected = [];
        const actual = transactionsReducer(initialState, action);

        expect(actual).to.eql(expected);

    });

    it(`should put interchange results`, () => {

        const transactions = fakeStateCase1WithTransactions.transactions;

        const action = {
            type: PUT_INTERCHANGE_RESULTS,
            transactions
        };

        const expected = transactions;

        const actual = transactionsReducer(fakeStateCase1, action);

        expect(actual).to.eql(expected);

    });

    it(`should integrate into combinedReducers`, () => {

        const transactions = fakeStateCase1WithTransactions.transactions;

        const action = {
            type: PUT_INTERCHANGE_RESULTS,
            transactions
        };

        const transactionsReducerResponse = transactionsReducer(fakeStateCase1, action);
        const combinedReducersResponse = combinedReducers(fakeStateCase1, action).transactions;

        expect(transactionsReducerResponse).to.eql(combinedReducersResponse);

    });

});