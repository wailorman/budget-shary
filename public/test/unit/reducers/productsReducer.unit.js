"use strict";

import { productsReducer } from '../../../src/reducer'
import {
    REMOVE_PRODUCT, NEW_PRODUCT, CHANGE_PRODUCT,
    REMOVE_PERSON
} from '../../../src/actions'
import { fakeState } from '../../fixtures/fake-state'

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
                {id: '2', name: 'Milk', price: '60', ownerId: '2'}
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

        const doNewProduct = (actionParams = { ownerId: '1' })=> {

            const action = {
                type: NEW_PRODUCT,
                ownerId: actionParams.ownerId
            };

            const state = productsReducer(initialStateProducts, action);
            const addedProduct = _.last(state);

            return { state, addedProduct };

        };

        it(`products array length should increase`, () => {

            const { state } = doNewProduct();

            expect(state.length).to.eql(initialStateProducts.length + 1);

        });

        it(`id of new product should be a number`, () => {

            const { addedProduct } = doNewProduct();

            expect(addedProduct.id).to.match(/\d/);

        });

        it(`name & price should be empty`, () => {

            const { addedProduct } = doNewProduct();

            expect(addedProduct.name).to.eql('');
            expect(addedProduct.price).to.eql('');

        });

        it(`ownerId should eql to action's ownerId`, () => {

            const { addedProduct } = doNewProduct();

            expect(addedProduct.ownerId).to.eql('1');

        });

        it(`ownerId == null or undefined if ownerId wasn't passed`, () => {

            const { addedProduct } = doNewProduct({ownerId: null});

            expect(addedProduct.ownerId).to.eql(null);

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

    describe("REMOVE_PERSON", ()=> {

        const doRemovePerson = (actionParams = { id: '1' })=> {

            const action = {
                type: REMOVE_PERSON,
                id: actionParams.id
            };

            const state = productsReducer(initialStateProducts, action);

            return {state};

        };

        it(`should remove all person's products`, () => {

            const personId = '1';

            const ownedProductsBefore = _.filter(initialStateProducts, ({ownerId}) => ownerId == personId);

            expect(ownedProductsBefore.length > 0 ).to.eql(true);

            const { state } = doRemovePerson({id: personId});

            const ownedProductsAfter = _.filter(state, ({ownerId}) => ownerId == personId);

            expect(ownedProductsAfter.length == 0 ).to.eql(true);

        });

    });

});