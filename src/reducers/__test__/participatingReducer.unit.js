import {participatingReducer} from '../participatingReducer';
import {
    toggleParticipation,
    REMOVE_PERSON, REMOVE_PRODUCT, FETCH_BUDGET
} from '../../actions';

import { Map } from 'immutable';
import sinonSandbox from '../../../test/helpers/sinon-sandbox';
import * as reducerUtils from '../../utils/reducer-utils';

const { assert } = require('chai').use(require('chai-immutable'));

const exampleMap = Map({
    'prod1': Map({
        'pers1': true,
        'pers2': false
    }),
    'prod2': Map({
        'pers3': true,
        'pers2': true
    })
});

const exampleObj = {
    'prod1': {
        'pers1': true,
        'pers2': false
    },
    'prod2': {
        'pers3': true,
        'pers2': true
    }
};

describe("UNIT / Reducers / participatingReducer", ()=> {

    let sandbox;

    sinonSandbox((sinon) => {
        sandbox = sinon;
    });

    describe("FETCH_BUDGET", () => {

        it(`should call reducer utils method`, () => {

            const spy = sandbox.spy(reducerUtils, "fetch");

            const action = {
                type: FETCH_BUDGET,
                id: 'budget1',
                result: { productParticipating: exampleObj }
            };

            participatingReducer(exampleMap, action);

            assert.ok(spy.calledOnce, "wasn't called");
            assert.ok(spy.calledWithExactly('result.productParticipating', exampleMap, action));

        });

    });

    describe("REMOVE_PRODUCT", ()=> {

        it(`should remove product from participating`, () => {

            const action = {
                type: REMOVE_PRODUCT,
                id: 'prod1'
            };

            assert.equal(
                participatingReducer(exampleMap, action),
                exampleMap.delete('prod1')
            );

            assert.isUndefined(
                participatingReducer(exampleMap, action).get('prod1')
            );

        });

        it(`should leave alone if no such product`, () => {

            const action = {
                type: REMOVE_PRODUCT,
                id: 'prod100'
            };

            assert.equal(
                participatingReducer(exampleMap, action),
                exampleMap
            );

        });

    });

    describe("REMOVE_PERSON", ()=> {

        it(`should remove person from all participating elements`, () => {

            const action = {
                type: REMOVE_PERSON,
                id: 'pers2'
            };

            assert.isUndefined(
                participatingReducer(exampleMap, action).getIn(['prod1', 'pers2'])
            );

            assert.isUndefined(
                participatingReducer(exampleMap, action).getIn(['prod2', 'pers2'])
            );

        });

        it(`should leave alone if no such person`, () => {

            const action = {
                type: REMOVE_PERSON,
                id: 'pers200'
            };

            assert.equal(
                participatingReducer(exampleMap, action),
                exampleMap
            );

        });

    });

    describe("TOGGLE_PARTICIPATION", ()=> {

        it(`should return the same state w/out productId or personId`, () => {

            assert.equal(
                exampleMap,
                participatingReducer(
                    exampleMap,
                    toggleParticipation('prod1', null)
                )
            );

            assert.equal(
                exampleMap,
                participatingReducer(
                    exampleMap,
                    toggleParticipation(null, 'pers1')
                )
            );

        });

        it(`should make person a product participant`, () => {

            const result = participatingReducer(
                Map(),
                toggleParticipation('prod1', 'pers1')
            );

            assert.equal( result.getIn(['prod1', 'pers1']), true );
            assert.sizeOf( result, 1 );
            assert.sizeOf( result.get('prod1'), 1 );

        });
        
        it(`should omit person from participants`, () => {

            const result = participatingReducer(
                participatingReducer(
                    Map(),
                    toggleParticipation('prod1', 'pers1')
                ),
                toggleParticipation('prod1', 'pers1')
            );

            assert.equal( result.getIn(['prod1', 'pers1']), false );
            
        });

        it(`should persist value after twice toggle`, () => {

            const result1 = participatingReducer(
                exampleMap,
                toggleParticipation('prod1', 'pers1')
            );

            const result2 = participatingReducer(
                result1,
                toggleParticipation('prod1', 'pers1')
            );

            assert.notEqual(
                result1.getIn(['prod1', 'pers1']),
                result2.getIn(['prod1', 'pers1']),
            );

        });

        it(`should add person to participants`, () => {

            const result = participatingReducer(
                exampleMap,
                toggleParticipation('prod1', 'pers10')
            );

            assert.equal( result.getIn(['prod1', 'pers10']), true );

        });

        it(`should add product w/ person`, () => {

            const result = participatingReducer(
                exampleMap,
                toggleParticipation('prod10', 'pers1')
            );

            assert.equal( result.getIn(['prod10', 'pers1']), true );

        });

        describe("should not touch other elements", () => {

            it(`after twice toggle`, () => {

                const result1 = participatingReducer(
                    exampleMap,
                    toggleParticipation('prod1', 'pers1')
                );

                const result2 = participatingReducer(
                    result1,
                    toggleParticipation('prod1', 'pers1')
                );

                assert.equal(
                    result1.deleteIn(['prod1', 'pers1']),
                    exampleMap.deleteIn(['prod1', 'pers1'])
                );
                assert.equal(
                    result2.deleteIn(['prod1', 'pers1']),
                    exampleMap.deleteIn(['prod1', 'pers1'])
                );

            });

            it(`after product add`, () => {

                const result = participatingReducer(
                    exampleMap,
                    toggleParticipation('prod10', 'pers1')
                );

                assert.equal(
                    result.delete('prod10'),
                    exampleMap.delete('prod10')
                );

            });

            it(`after person add`, () => {

                const result = participatingReducer(
                    exampleMap,
                    toggleParticipation('prod1', 'pers10')
                );

                assert.equal(
                    result.deleteIn(['prod1', 'pers10']),
                    exampleMap.deleteIn(['prod1', 'pers10'])
                );

            });

        });
        
    });
    
});