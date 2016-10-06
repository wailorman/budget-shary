import {budgetReducer} from '../reducer'
import {CHANGE_BUDGET_PROPS, FETCH_BUDGET} from '../../actions'

describe("UNIT / Reducers / budgetReducer", ()=> {

    it(`should return initial state if no action passed`, () => {

        const state = {};

        const actual = budgetReducer(state);

        expect(actual).to.eql(state);

    });

    describe("CHANGE_BUDGET_PROPS", ()=> {

        it(`should change name of active budget`, () => {

            const action = {
                type: CHANGE_BUDGET_PROPS,
                values: {
                    name: 'Another name'
                }
            };

            const state = {
                name: 'First name'
            };

            const expected = {
                name: 'Another name'
            };

            const actual = budgetReducer(state, action);

            expect(actual).to.eql(expected);

        });
        
    });

    describe("FETCH_BUDGET", ()=> {

        it(`should fetch budget properties`, () => {

            const action = {
                type: FETCH_BUDGET,
                result: {
                    budget: {
                        name: 'Pretty budget'
                    }
                }
            };

            const state = {};

            const expected = {
                name: 'Pretty budget'
            };

            const actual = budgetReducer(state, action);

            expect(actual).to.eql(expected);

        });

    });
    
});