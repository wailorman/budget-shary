import { commonReducer } from '../commonReducer';
import {UPDATE_SHARE_SUM, CHANGE_PERSON, FETCH_BUDGET} from '../../actions';
import {normalizedBigFakeState} from '../../../test/fixtures/fake-state';

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

    describe("FETCH_BUDGET", ()=> {

        it(`should return clean state if .result wasn't attached to action`, () => {

            const action = {
                type: FETCH_BUDGET,
                id: 'budget1'
            };

            const expected = {};

            const actual = commonReducer({}, action);

            expect(actual).to.eql(expected);

        });

        it(`should return commons if .result is attached`, () => {

            const action = {
                type: FETCH_BUDGET,
                id: 'budget1',
                result: normalizedBigFakeState
            };

            const expected = normalizedBigFakeState.common;

            const actual = commonReducer({}, action);

            expect(actual).to.eql(expected);

        });

        it(`should clean previous state if .result wasn't attached`, () => {

            const action = {
                type: FETCH_BUDGET,
                id: 'budget1'
            };

            const expected = {};

            const actual = commonReducer(normalizedBigFakeState.common, action);

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

    });

    it(`should update shareSum even if it's not CHANGE_PERSON action`, () => {

        const action = {
            type: 'CHANGE_PRODUCT',
            id: '1',
            values: {
                name: 'Milk',
                price: '50'
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
    
});