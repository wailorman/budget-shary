"use strict";

import { productsReducer } from '../../src/reducer'
import { REMOVE_PRODUCT, NEW_PRODUCT } from '../../src/actions'
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

});

describe("UNIT / Reducers / main", ()=> {

    it(`should remove product`, () => {

        const action = {
            type: REMOVE_PRODUCT,
            id: '1'
        };

        //let expectedState =

    });

});