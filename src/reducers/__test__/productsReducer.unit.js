"use strict";

import {productsReducer} from '../productsReducer';
import {
    REMOVE_PRODUCT, NEW_PRODUCT, CHANGE_PRODUCT,
    REMOVE_PERSON, FETCH_BUDGET
} from '../../actions';

import { OrderedMap, Map } from 'immutable';
import sinonSandbox from '../../../test/helpers/sinon-sandbox';
import * as reducerUtils from '../../utils/reducer-utils';

import {initialState} from '../initial-state';

const exampleProductsObj = {
    1: {id: '1', name: 'Water', price: '40', ownerId: '1'},
    2: {id: '2', name: 'Milk', price: '60', ownerId: '2'}
};

const exampleProductsMap = OrderedMap({
    '1': Map({id: '1', name: 'Water', price: '40', ownerId: '1'}),
    '2': Map({id: '2', name: 'Milk', price: '60', ownerId: '2'}),
    '3': Map({id: '3', name: 'Chips', price: '10', ownerId: '2'})
});

describe("UNIT / Reducers / productsReducer", ()=> {

    let sandbox;

    sinonSandbox((sinon) => {
        sandbox = sinon;
    });

    it(`should return default initial state if no args`, () => {

        const actual = productsReducer();

        expect(actual).to.eql(initialState.products);

    });

    it(`should return exactly default initial state`, () => {

        const actual = productsReducer();

        expect(actual === initialState.products).to.eql(true);

    });

    describe("FETCH_BUDGET", ()=> {

        it(`should call reducer utils method`, () => {

            const spy1 = sandbox.spy(reducerUtils, "fetch");

            const action = {
                type: FETCH_BUDGET,
                id: 'budget1',
                result: { products: exampleProductsObj }
            };

            productsReducer(exampleProductsMap, action);

            assert.ok(spy1.calledOnce, "wasn't called");
            assert.ok(spy1.calledWithExactly('result.products', exampleProductsMap, action));

        });

    });

    describe("REMOVE_PRODUCT", ()=> {

        it(`should call reducer utils method`, () => {

            const spy = sandbox.spy(reducerUtils, "remove");

            const action = {
                type: REMOVE_PRODUCT,
                id: '1'
            };

            productsReducer(exampleProductsMap, action);

            assert.ok( spy.calledOnce );
            assert.ok( spy.calledWithExactly(exampleProductsMap, action) );

        });

        it(`should remove existing product from the state`, () => {

            const action = {
                type: REMOVE_PRODUCT,
                id: '1'
            };

            const result = productsReducer(exampleProductsMap, action);

            assert.isUndefined(result.get('id'));
            assert.equal(result.size, exampleProductsMap.size - 1);

        });

    });

    describe("NEW_PRODUCT", ()=> {

        it(`should call reducer utils method`, () => {

            const spy = sandbox.spy(reducerUtils, "add");

            const action = {
                type: NEW_PRODUCT,
                id: '100'
            };

            productsReducer(exampleProductsMap, action);

            assert.ok( spy.calledOnce, "wasn't called" );
            assert.ok( spy.calledWithExactly(exampleProductsMap, action), "wrong arguments" );

        });

        it(`should create person w/ right attrs`, () => {

            const action = {
                type: NEW_PRODUCT,
                id: '100',
                values: {
                    name: '',
                    price: '',
                    ownerId: '2'
                }
            };

            const result = productsReducer(exampleProductsMap, action).get('100');

            assert.deepEqual( result.get('name'), '' );
            assert.deepEqual( result.get('price'), '' );
            assert.deepEqual( result.get('ownerId'), '2' );

        });

    });

    describe("CHANGE_PRODUCT", ()=> {

        it(`should call reducer utils method`, () => {

            const spy = sandbox.spy(reducerUtils, "update");

            const action = {
                type: CHANGE_PRODUCT,
                id: '1',
                values: {
                    name: 'Clean water',
                    price: '50',
                    ownerId: '5'
                }
            };

            productsReducer(exampleProductsMap, action);

            assert.ok( spy.calledOnce, "wasn't called" );
            assert.ok( spy.calledWithExactly(exampleProductsMap, action), "wrong arguments" );

        });

        it(`should change person fields`, () => {

            const action = {
                type: CHANGE_PRODUCT,
                id: '1',
                values: {
                    name: 'Clean water',
                    price: '50',
                    ownerId: '5'
                }
            };

            const result = productsReducer(exampleProductsMap, action).get('1');

            assert.equal(
                result.get('name'),
                'Clean water'
            );

            assert.equal(
                result.get('price'),
                '50'
            );

            assert.equal(
                result.get('ownerId'),
                '5'
            );

        });

    });

    describe("REMOVE_PERSON", ()=> {

        it(`should remove all person's products`, () => {

            const action = {
                type: REMOVE_PERSON,
                id: '2'
            };

            const result = productsReducer(exampleProductsMap, action);

            assert.equal(result.size, 1);
            assert.ok(result.get('1'));

        });

        it(`should not remove any product w/ another person`, () => {

            const action = {
                type: REMOVE_PERSON,
                id: '200'
            };

            const result = productsReducer(exampleProductsMap, action);

            assert.ok(result.equals(exampleProductsMap));

        });

    });

});