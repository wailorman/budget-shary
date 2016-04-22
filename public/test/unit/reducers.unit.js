import { transactionsReducer } from '../../src/reducer'
import { PROCEED_INTERCHANGE } from '../../src/actions'
import { fakeStateCase1, fakeStateCase1WithTransactions } from '../fixtures/fake-state'
import { humanifyTransactions } from '../../src/core/utils'

describe("UNIT / Reducers", ()=> {

    describe("transactions reducer", ()=> {
        
        it(`should return original state if no actions`, () => {

            const action = {
                type: 'SOME_ACTION'
            };

            const expected = fakeStateCase1;
            const actual = transactionsReducer(fakeStateCase1, action);

            expect(actual).to.eql(expected);

        });
        
        it(`should return humanified transactions`, () => {

            const action = {
                type: PROCEED_INTERCHANGE
            };

            const expected = humanifyTransactions(fakeStateCase1WithTransactions);

            const actual = transactionsReducer(fakeStateCase1, action);

            expect(actual).to.eql(expected);

        });
        
    });
    
});