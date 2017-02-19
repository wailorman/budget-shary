import { commonReducer } from '../commonReducer';
import {FETCH_BUDGET} from '../../actions';
import { Map } from 'immutable';
import sinonSandbox from '../../../test/helpers/sinon-sandbox';
import * as reducerUtils from '../../utils/reducer-utils';

const exampleObj = {
    shareSum: '40'
};

const exampleMap = Map({
    shareSum: '40'
});

describe("UNIT / Reducers / commonReducer", ()=> {

    let sandbox;

    sinonSandbox((sinon) => {
        sandbox = sinon;
    });

    it(`should return the same state if no action was passed`, () => {

        const actual = commonReducer({hey: 'yo'});

        const expected = {hey: 'yo'};

        expect(actual).to.eql(expected);

    });

    describe("FETCH_BUDGET", ()=> {

        it(`should return commons if .result is attached`, () => {

            const spy = sandbox.spy(reducerUtils, "fetch");

            const action = {
                type: FETCH_BUDGET,
                id: 'budget1',
                result: {
                    common: exampleObj
                }
            };

            commonReducer(exampleMap, action);

            assert.ok(spy.calledOnce, "wasn't called");
            assert.ok(spy.calledWithExactly('result.common', exampleMap, action));

        });

    });

    describe("any other action", ()=> {

        it(`should update shareSum if it was passed in the action`, () => {

            const action = {
                id: '1',
                values: {
                    name: 'Mike',
                    share: '50'
                },
                meta: {
                    newShareSum: '110'
                }
            };

            assert.equal(
                commonReducer(exampleMap, action).get('shareSum'),
                '110'
            );

        });

    });
    
});