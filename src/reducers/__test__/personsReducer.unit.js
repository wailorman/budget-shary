import {personsReducer} from '../personsReducer';
import { OrderedMap, Map } from 'immutable';
import sinonSandbox from '../../../test/helpers/sinon-sandbox';
import * as reducerUtils from '../../utils/reducer-utils';

const { expect, assert } = require('chai');

import {
    REMOVE_PERSON, NEW_PERSON, CHANGE_PERSON,
    FETCH_BUDGET,
    TOGGLE_PARTICIPATION
} from '../../actions';

import {initialState} from '../initial-state';

const exampleObj = {
    '1': {id: '1', name: 'Mike', share: '40'},
    '2': {id: '2', name: 'Jack', share: '60'}
};

const exampleMap = OrderedMap({
    '1': Map({id: '1', name: 'Mike', share: '40'}),
    '2': Map({id: '2', name: 'Jack', share: '60'})
});


describe("UNIT / Reducers / personsReducer", () => {

    let sandbox;

    sinonSandbox((sinon) => {
        sandbox = sinon;
    });

    it(`should return default initial state if no args`, () => {

        const actual = personsReducer();

        expect(actual).to.eql(initialState.persons);

    });

    it(`should return exactly default initial state`, () => {

        const actual = personsReducer();

        expect(actual === initialState.persons).to.eql(true);

    });

    describe("FETCH_BUDGET", () => {

        it(`should call reducer utils method`, () => {

            const spy = sandbox.spy(reducerUtils, "fetch");

            const action = {
                type: FETCH_BUDGET,
                id: 'budget1',
                result: { persons: exampleObj }
            };

            personsReducer(exampleMap, action);

            assert.ok(spy.calledOnce, "wasn't called");
            assert.ok(spy.calledWithExactly('result.persons', exampleMap, action));

        });

    });

    describe("REMOVE_PERSON", () => {

        it(`should call reducer utils method`, () => {

            const spy = sandbox.spy(reducerUtils, "remove");

            const action = {
                type: REMOVE_PERSON,
                id: '1'
            };

            personsReducer(exampleMap, action);

            assert.ok( spy.calledOnce );
            assert.ok( spy.calledWithExactly(exampleMap, action) );

        });

        it(`should remove person`, () => {

            const action = {
                type: REMOVE_PERSON,
                id: '1'
            };

            const result = personsReducer(exampleMap, action);

            assert.isUndefined(result.get('1'));
            assert.equal(result.size, exampleMap.size - 1);

        });

    });

    describe("NEW_PERSON", () => {

        it(`should call reducer utils method`, () => {

            const spy = sandbox.spy(reducerUtils, "add");

            const action = {
                type: NEW_PERSON,
                id: '100'
            };

            personsReducer(exampleMap, action);

            assert.ok( spy.calledOnce, "wasn't called" );
            assert.ok( spy.calledWithExactly(exampleMap, action), "wrong arguments" );

        });

        it(`should create person w/ right attrs`, () => {

            const action = {
                type: NEW_PERSON,
                id: '100',
                values: {
                    name: '',
                    share: ''
                }
            };

            const result = personsReducer(exampleMap, action).get('100');

            assert.deepEqual( result.get('name'), '' );
            assert.deepEqual( result.get('share'), '' );

        });

    });

    describe("CHANGE_PERSON", () => {

        it(`should call reducer utils method`, () => {

            const spy = sandbox.spy(reducerUtils, "update");

            const action = {
                type: CHANGE_PERSON,
                id: '1',
                values: {
                    name: 'Clean water',
                    share: '50'
                }
            };

            personsReducer(exampleMap, action);

            assert.ok( spy.calledOnce, "wasn't called" );
            assert.ok( spy.calledWithExactly(exampleMap, action), "wrong arguments" );

        });

        it(`should change person fields`, () => {

            const action = {
                type: CHANGE_PERSON,
                id: '1',
                values: {
                    name: 'Clean water',
                    share: '50'
                }
            };

            const result = personsReducer(exampleMap, action).get('1');

            assert.equal(
                result.get('name'),
                'Clean water'
            );

            assert.equal(
                result.get('share'),
                '50'
            );

        });

    });

    describe("TOGGLE_PARTICIPATION", () => {

        it(`should change persons shares`, () => {

            const action = {
                type: TOGGLE_PARTICIPATION,
                meta: {
                    newPersonShares: {
                        '1': '20',
                        '2': '30'
                    }
                }
            };

            const result = personsReducer(exampleMap, action);

            assert.equal(result.getIn(['1', 'share']), '20');
            assert.equal(result.getIn(['2', 'share']), '30');

        });

        it(`should set to 0 persons' shares not specified in action`, () => {

            const action = {
                type: TOGGLE_PARTICIPATION,
                meta: {
                    newPersonShares: {
                        '100': '50'
                    }
                }
            };

            const result = personsReducer(exampleMap, action);

            assert.equal(result.getIn(['1', 'share']), '0');
            assert.equal(result.getIn(['2', 'share']), '0');

        });

        it(`should ignore nonexistent persons`, () => {

            const action = {
                type: TOGGLE_PARTICIPATION,
                meta: {
                    newPersonShares: {
                        '1': '20',
                        '2': '30',
                        '3': '50'
                    }
                }
            };

            const result = personsReducer(exampleMap, action);

            assert.equal(result.getIn(['1', 'share']), '20');
            assert.equal(result.getIn(['2', 'share']), '30');
            assert.equal(result.size, exampleMap.size);

        });

        it(`should return exactly the same state if no .meta.newPersonShares`, () => {

            const action = {
                type: TOGGLE_PARTICIPATION
            };

            const result = personsReducer(exampleMap, action);

            assert.equal( result, exampleMap );

        });

    });

});