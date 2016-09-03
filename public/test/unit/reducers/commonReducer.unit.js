import { commonReducer } from '../../../src/reducer'
import {UPDATE_SHARE_SUM, CHANGE_PERSON} from '../../../src/actions'

describe("UNIT / Reducers / commonReducer", ()=> {
    
    it(`should return {} as initial state`, () => {
        
        const actual = commonReducer();
        
        const expected = {};
        
        expect(actual).to.eql(expected);
        
    });

    it(`should return the same state if no action was passed`, () => {

        const actual = commonReducer({hey: 'yo'});

        const expected = {hey: 'yo'};

        expect(actual).to.eql(expected);

    });

    describe("UPDATE_SHARE_SUM", ()=> {

        it(`should set share sum if state doesn't have shareSum prop`, () => {

            const action = {
                type: UPDATE_SHARE_SUM,
                value: 100
            };

            const actual = commonReducer({}, action);

            const expected = {
                shareSum: 100
            };

            expect(actual).to.eql(expected);

        });

        it(`should rewrite share sum`, () => {

            const action = {
                type: UPDATE_SHARE_SUM,
                value: 110
            };

            const previousState = {
                shareSum: 90
            };

            const actual = commonReducer(previousState, action);

            const expected = {
                shareSum: 110
            };

            expect(actual).to.eql(expected);

        });

        it(`should leave alone shareSum if no action passed to the reducer`, () => {

            const action = undefined;

            const previousState = {
                shareSum: 95
            };

            const actual = commonReducer(previousState, action);

            const expected = {
                shareSum: 95
            };

            expect(actual).to.eql(expected);

        });

        it(`should leave shareSum alone if action received w/out value`, () => {

            const action = {
                type: UPDATE_SHARE_SUM
            };

            const previousState = {
                shareSum: 95
            };

            const actual = commonReducer(previousState, action);

            const expected = {
                shareSum: 95
            };

            expect(actual).to.eql(expected);

        });

    });

    describe("CHANGE_PERSON", ()=> {

        it(`should update shareSum if it was passed in the action`, () => {

            const action = {
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

            const expected = {
                shareSum: '110'
            };

            const actual = commonReducer({}, action);

            expect(actual).to.eql(expected);

        });

        it(`should remove shareSum from state if not`, () => {

            const action = {
                type: CHANGE_PERSON,
                id: '1',
                values: {
                    name: 'Mike',
                    share: '50'
                }
            };

            const expected = {};

            const actual = commonReducer({shareSum: '100'}, action);

            expect(actual).to.eql(expected);

        });

    });
    
});