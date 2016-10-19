import {participatingReducer} from '../reducer'
import {toggleParticipation} from '../../actions'

describe("UNIT / Reducers / participatingReducer", ()=> {

    // todo: REMOVE_PRODUCT & REMOVE_PERSON

    describe("TOGGLE_PARTICIPATION", ()=> {

        const fireAction = function (initialState, productId, personId) {

            const action = toggleParticipation(productId, personId);

            return participatingReducer(initialState, action);

        };

        it(`should make person a product participant`, () => {

            const initialState = {};

            const expectedState = {
                1: {
                    1: true
                }
            };

            const actualState = fireAction(initialState, 1, 1);

            expect(actualState).to.eql(expectedState);
            
        });
        
        it(`should remove person from product participants`, () => {

            const initialState = {
                1: {
                    1: true
                }
            };

            const expectedState = {
                1: {
                    1: false
                }
            };

            const actualState = fireAction(initialState, 1, 1);

            expect(actualState).to.eql(expectedState);
            
        });
        
        it(`should add another person to participants`, () => {

            const initialState = {
                1: {
                    1: true
                }
            };

            const expectedState = {
                1: {
                    1: true,
                    2: true
                }
            };

            const actualState = fireAction(initialState, 1, 2);

            expect(actualState).to.eql(expectedState);

        });

        it(`should remove only second person from participants`, () => {

            const initialState = {
                1: {
                    1: true,
                    2: true
                }
            };

            const expectedState = {
                1: {
                    1: true,
                    2: false
                }
            };

            const actualState = fireAction(initialState, 1, 2);

            expect(actualState).to.eql(expectedState);

        });

        it(`should add participant to another product`, () => {

            const initialState = {
                1: {
                    1: true
                }
            };

            const expectedState = {
                1: {
                    1: true
                },
                2: {
                    1: true
                }
            };

            const actualState = fireAction(initialState, 2, 1);

            expect(actualState).to.eql(expectedState);

        });
        
    });
    
});