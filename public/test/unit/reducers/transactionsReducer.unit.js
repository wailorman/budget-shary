import { transactionsReducer, combinedReducers } from '../../../src/reducer'

import {

    PROCEED_INTERCHANGE,
    PUT_INTERCHANGE_RESULTS, DISPLAY_INTERCHANGE_ERROR,

    realizeInterchange

} from '../../../src/actions'

import { fakeStateCase1, fakeStateCase1WithTransactions } from '../../fixtures/fake-state'
import { humanifyTransactions } from '../../../src/core/utils'

describe("UNIT / Reducers / transactionsReducer", ()=> {


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