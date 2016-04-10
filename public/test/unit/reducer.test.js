import { productsReducer } from '../../src/reducer'
import { REMOVE_PRODUCT } from '../../src/actions'

describe("productsReducer", ()=> {

    describe("REMOVE_PRODUCT", ()=> {

        const initialState = {
            1: {name: 'Jack', share: '40'},
            2: {name: 'Billy', share: '60'}
        };

        it(`should remove existing product from the state`, () => {

            const action = {
                type: REMOVE_PRODUCT,
                id: 1
            };

            const actual = productsReducer(initialState, action);

            const expected = {
                2: {name: 'Billy', share: '100'}
            };

            expect(actual).to.eql(expected);

        });

        // should leave state alone if product doesn't exist

    });

});