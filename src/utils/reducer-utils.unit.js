import { OrderedMap, Map } from 'immutable';
const { expect, assert } = require('chai');
import sinonSandbox from '../../test/helpers/sinon-sandbox';
import * as immutableConverter from './immutable-converter';


import {
    addWithDefaults,
    add,
    update,
    remove,
    fetch
} from './reducer-utils';


const exampleMap = OrderedMap({
    '1': Map({id: '1', name: 'Mike', share: '40'}),
    '2': Map({id: '2', name: 'Jack', share: '60'})
});

describe("UNIT / Utils / Reducer utils", () => {

    let sandbox;

    sinonSandbox((sinon) => {
        sandbox = sinon;
    });

    describe("#addWithDefaults()", () => {

        it(`should add new item`, () => {

            const action = {
                id: '100'
            };


            assert.equal(
                addWithDefaults()(exampleMap, action).size,
                exampleMap.size + 1
            );

            assert.equal(
                addWithDefaults()(exampleMap, action).get('100').get('id'),
                '100'
            );

        });

        it(`should not add any other values`, () => {

            const action = {
                id: '100'
            };

            assert.equal(
                addWithDefaults()(exampleMap, action).get('100').size,
                1
            );

        });

        it(`should write default values`, () => {

            const action = {
                id: '100'
            };

            const result = addWithDefaults({name: 'Mark', share: '50'})(exampleMap, action);

            assert.equal(
                result.get('100').get('id'),
                '100'
            );

            assert.equal(
                result.get('100').get('name'),
                'Mark'
            );

            assert.equal(
                result.get('100').get('share'),
                '50'
            );

        });

        it(`should not touch other items`, () => {

            const action = {
                id: '100'
            };

            const result = addWithDefaults({name: 'Mark', share: '50'})(exampleMap, action);

            const otherItems = result.delete('100');

            assert( otherItems.equals( exampleMap ) );

        });

        it(`should not add item w/ existing id`, () => {

            const action = {
                id: '1'
            };


            assert.ok(
                addWithDefaults()(exampleMap, action).equals(exampleMap)
            );

        });

    });

    describe("#add()", () => {

        it(`should call addWithDefaults`, () => {

            const action = {
                id: '50',
                values: {
                    name: 'Rick',
                    share: '40',
                    age: '100'
                }
            };

            const result = add(exampleMap, action);

            assert.ok(
                result.equals(
                    addWithDefaults(action.values)(exampleMap, {id: action.id})
                )
            );

        });

    });

    describe(`#update()`, () => {

        it(`should change fields`, () => {

            const action = {
                id: '1',
                values: {
                    name: 'Clean water',
                    share: '50'
                }
            };

            const result = update(exampleMap, action);

            assert.equal(
                result.get('1').get('name'),
                'Clean water'
            );

            assert.equal(
                result.get('1').get('share'),
                '50'
            );

        });

        it(`should change only name`, () => {

            const action = {
                id: '1',
                values: {
                    name: 'Tom'
                }
            };

            assert.equal(
                update(exampleMap, action).get('1').get('name'),
                'Tom'
            );

        });

        it(`should change nested values`, () => {

            const action = {
                id: '1',
                values: {
                    address: {
                        city: 'Moscow'
                    }
                }
            };

            assert.equal(
                update(exampleMap, action).get('1').get('address').get('city'),
                'Moscow'
            );

        });

        it(`should not touch other fields`, () => {

            const action = {
                id: '1',
                values: {
                    name: 'Tom'
                }
            };

            assert.equal(
                update(exampleMap, action).get('1').get('share'),
                exampleMap.get('1').get('share')
            );

        });


        it(`should not do anything if item doesn't exist`, () => {

            const action = {
                id: '201',
                values: {
                    name: 'Clean water',
                    share: '50'
                }
            };

            assert.ok(
                update(exampleMap, action) == exampleMap
            );

        });

        it(`should not touch other items`, () => {

            const action = {
                id: '1',
                values: {
                    name: 'Tom'
                }
            };

            const result = update(exampleMap, action).delete('1');

            assert.ok(
                result.equals(exampleMap.delete('1'))
            );

        });

    });

    describe("#remove()", () => {

        it(`should remove item`, () => {

            const action = {
                id: '1'
            };

            assert.ok(
                remove(exampleMap, action)
                    .equals(exampleMap.delete('1'))
            );

        });

        it(`should ignore nonexistent item`, () => {

            const action = {
                id: '99'
            };

            assert.ok(
                remove(exampleMap, action)
                    .equals(exampleMap)
            );

        });

    });

    describe("fetch()", () => {

        it(`should call nestedMap()`, () => {

            const spy = sandbox.spy(immutableConverter, "nestedMap");

            const action = {
                result: {
                    items: {
                        '1': {
                            id: '1',
                            name: 'Some some'
                        }
                    }
                }
            };

            fetch('result.items')(exampleMap, action);

            assert.ok( spy.calledOnce, "wasn't called" );
            assert.ok( spy.calledWithExactly(action.result.items), "wrong arguments" );

        });

    });


});