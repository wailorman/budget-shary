"use strict";

import { productsReducer } from '../../src/reducer'
import { REMOVE_PRODUCT } from '../../src/actions'

const initialState = {
    products: {
        1: {name: 'Water', price: '40'},
        2: {name: 'Milk', price: '60'}
    }
};

describe("UNIT / Reducers / productsReducer", ()=> {

    const initialStateProducts = initialState.products;

    describe("REMOVE_PRODUCT", ()=> {

        it(`should remove existing product from the state`, () => {

            const action = {
                type: REMOVE_PRODUCT,
                id: 1
            };

            const actual = productsReducer(initialStateProducts, action);

            const expected = {
                2: {name: 'Milk', price: '60'}
            };

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

        // should add new empty product

        // should add another empty product

    });

});

describe("Reducers / main", ()=> {

    it(`should remove product`, () => {

        const action = {
            type: REMOVE_PRODUCT,
            id: 1
        };

        //let expectedState =

    });

});