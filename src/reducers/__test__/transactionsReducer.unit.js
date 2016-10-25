import { transactionsReducer } from '../transactionsReducer';

import {

    PROCEED_INTERCHANGE,

    FETCH_BUDGET

} from '../../actions';

import { fakeStateCase1, fakeStateCase1WithTransactions, normalizedBigFakeState } from '../../../test/fixtures/fake-state';

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

        const expected = [];
        const actual = transactionsReducer(initialState, action);

        expect(actual).to.eql(expected);

    });

    it(`should put interchange results`, () => {

        const transactions = fakeStateCase1WithTransactions.transactions;

        const action = {
            type: PROCEED_INTERCHANGE,
            meta: {
                transactions
            }
        };

        const expected = transactions;

        const actual = transactionsReducer(fakeStateCase1, action);

        expect(actual).to.eql(expected);

    });

});