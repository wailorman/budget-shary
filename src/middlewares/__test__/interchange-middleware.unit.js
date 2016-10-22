import {interchangeMiddleware} from './../interchange-middleware'
import {PROCEED_INTERCHANGE, CHANGE_PERSON} from '../../actions'
import {normalizedBigFakeState} from '../../../test/fixtures/fake-state'

describe("UNIT / Middlewares / Interchange middleware", ()=> {

    const state = {
        persons: normalizedBigFakeState.persons,
        products: normalizedBigFakeState.products
    };

    const store = {
        getState(){
            return state;
        }
    };

    const callMiddleware = (action)=> {

        const next = (action)=> {
            return action;
        };

        const reducer = (state)=> {
            return state;
        };
        
        return interchangeMiddleware(reducer)(store)(next)(action);

    };

    it(`should not modify action if it's not PROCEED_INTERCHANGE`, () => {

        const action = {
            type: CHANGE_PERSON,
            id: '1',
            values: {
                name: 'Hey!!!'
            }
        };

        const actual = callMiddleware(action);

        expect(actual).to.eql(action);

    });

    it(`should attach transactions`, () => {

        const action = {
            type: PROCEED_INTERCHANGE
        };

        const actual = callMiddleware(action);

        const expected = {
            ...action,
            meta: {
                transactions: [
                    {
                        "from": "Jack",
                        "to": "Mike",
                        "total": 60
                    }
                ]
            }
        };

        expect(actual).to.eql(expected);

    });

});