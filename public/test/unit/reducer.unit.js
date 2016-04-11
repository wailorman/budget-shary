"use strict";

import { productsReducer } from '../../src/reducer'
import { REMOVE_PRODUCT, NEW_PRODUCT, CHANGE_PRODUCT } from '../../src/actions'
import { fakeState } from '../fixtures/fake-state'

const initialState = fakeState;

describe("UNIT / Reducers / productsReducer", ()=> {

    const initialStateProducts = initialState.products;

    describe("REMOVE_PRODUCT", ()=> {

        it(`should remove existing product from the state`, () => {

            const action = {
                type: REMOVE_PRODUCT,
                id: 1
            };

            const actual = productsReducer(initialStateProducts, action);

            const expected = [
                {id: '2', name: 'Milk', price: '60'}
            ];

            expect(actual).to.eql(expected);

        });

        it(`should leave state alone if product doesn't exist`, () => {

            const action = {
                type: REMOVE_PRODUCT,
                id: 3
            };

            const actual = productsReducer(initialStateProducts, action);

            expect(actual).to.eql(initialStateProducts);

        });

        it(`should leave state alone if product id == null`, () => {

            const action = {
                type: REMOVE_PRODUCT,
                id: null
            };

            const actual = productsReducer(initialStateProducts, action);

            expect(actual).to.eql(initialStateProducts);

        });

    });

    describe("NEW_PRODUCT", ()=> {

        it(`should add new empty product`, () => {

            const action = {
                type: NEW_PRODUCT
            };

            const actual = productsReducer(initialStateProducts, action);
            const newProduct = _.last(actual);

            expect(actual.length).to.eql(initialStateProducts.length + 1);
            expect(newProduct.id).to.match(/\d/);
            expect(newProduct.name).to.eql('');
            expect(newProduct.price).to.eql('');

        });

        it(`should add another empty product`, () => {

            const action = {
                type: NEW_PRODUCT
            };

            const firstCall = productsReducer(initialStateProducts, action);
            const actual = productsReducer(firstCall, action);

            expect(actual.length).to.eql(initialStateProducts.length + 2);

        });

    });

    describe("CHANGE_PRODUCT", ()=> {

        it(`should change product fields`, () => {

            const action = {
                type: CHANGE_PRODUCT,
                id: '1',
                values: {
                    name: 'Clean water',
                    price: '50'
                }
            };

            const result = productsReducer(initialStateProducts, action);

            const changedProduct = _.find(result, {id: '1'});

            expect(changedProduct.name).to.eql('Clean water');
            expect(changedProduct.price).to.eql('50');

        });

        it(`should not do anything if product doesn't exist`, () => {

            const action = {
                type: CHANGE_PRODUCT,
                id: '201',
                values: {
                    name: 'Clean water',
                    price: '50'
                }
            };

            const result = productsReducer(initialStateProducts, action);

            expect(result).to.eql(initialStateProducts)

        });

        it(`should return the same product if we pass old values`, () => {

            const action = {
                type: CHANGE_PRODUCT,
                id: '1',
                values: {
                    name: 'Water',
                    price: '40'
                }
            };

            const result = productsReducer(initialStateProducts, action);

            const changedProduct = _.find(result, {id: '1'});

            expect(changedProduct.name).to.eql('Water');
            expect(changedProduct.price).to.eql('40');

        });

        it(`should not remove fields we didn't pass to action`, () => {

            const action = {
                type: CHANGE_PRODUCT,
                id: '1',
                values: {
                    name: 'Clean water'
                }
            };

            const result = productsReducer(initialStateProducts, action);

            const changedProduct = _.find(result, {id: '1'});

            expect(changedProduct.name).to.eql('Clean water');
            expect(changedProduct.price).to.eql('40');

        });

    });

});