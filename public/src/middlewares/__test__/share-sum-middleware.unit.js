import {shareSumMiddleware} from './../share-sum-middleware'
import {reducer} from '../../reducers/reducer'
import {CHANGE_PERSON, CHANGE_PRODUCT} from '../../actions'
import {normalizedFakeState} from '../../../test/fixtures/fake-state'

describe("UNIT / Middlewares / share sum", ()=> {

    const fakeStore = (initialState) => {

        return {
            getState: ()=> {
                return initialState;
            }
        };

    };

    const store = fakeStore(normalizedFakeState);
    
    const callMiddleware = (action)=> {

        const next = (action)=> {
            return action;
        };

        return shareSumMiddleware(reducer)(store)(next)(action);

    };

    it(`should attach new shares sum into action`, () => {

        const action = {
            type: CHANGE_PERSON,
            id: '1',
            values: {
                name: 'Mike',
                share: '50'
            }
        };

        const expected = {
            type: CHANGE_PERSON,
            id: '1',
            values: {
                name: 'Mike',
                share: '50'
            },
            meta: {
                newShareSum: '110'
            }
        };

        const actual = callMiddleware(action);

        expect(actual).to.eql(expected);

    });
    
    it(`should not react on other actions`, () => {

        const action = {
            type: CHANGE_PRODUCT,
            id: '1',
            values: {
                name: 'Milk',
                price: '50'
            }
        };

        const expected = {
            type: CHANGE_PRODUCT,
            id: '1',
            values: {
                name: 'Milk',
                price: '50'
            }
        };

        const actual = callMiddleware(action);

        expect(actual).to.eql(expected);

    });

});