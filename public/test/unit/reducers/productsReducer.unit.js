"use strict";

import {productsReducer} from '../../../src/reducer'
import {
    REMOVE_PRODUCT, NEW_PRODUCT, CHANGE_PRODUCT,
    REMOVE_PERSON, FETCH_BUDGET
} from '../../../src/actions'
import {normalizedFakeState, normalizedBigFakeState} from '../../fixtures/fake-state'

import {getProductsByPersonId} from '../../../src/core/components-utils'
import { normalizedArrayLength } from '../../helpers/utils'

const initialState = normalizedFakeState;

describe("UNIT / Reducers / productsReducer", ()=> {

    const initialStateProducts = initialState.products;

    describe("FETCH_BUDGET", ()=> {

        it(`should return clean state if .result wasn't attached to action`, () => {

            const action = {
                type: FETCH_BUDGET,
                id: 'budget1'
            };

            const expected = {};

            const actual = productsReducer({}, action);

            expect(actual).to.eql(expected);

        });

        it(`should return products if .result is attached`, () => {

            const action = {
                type: FETCH_BUDGET,
                id: 'budget1',
                result: normalizedBigFakeState
            };

            const expected = normalizedBigFakeState.products;

            const actual = productsReducer({}, action);

            expect(actual).to.eql(expected);

        });

        it(`should clean previous state if .result wasn't attached`, () => {

            const action = {
                type: FETCH_BUDGET,
                id: 'budget1'
            };

            const expected = {};

            const actual = productsReducer(normalizedBigFakeState.products, action);

            expect(actual).to.eql(expected);

        });

    });

    describe("REMOVE_PRODUCT", ()=> {

        it(`should remove existing product from the state`, () => {

            const action = {
                type: REMOVE_PRODUCT,
                id: 1
            };

            const actual = productsReducer(initialStateProducts, action);

            const expected = {
                2: {id: '2', name: 'Milk', price: '60', ownerId: '2'}
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

        const doNewProduct = (actionParams = {ownerId: '1'})=> {

            const action = {
                type: NEW_PRODUCT,
                ownerId: actionParams.ownerId
            };

            const state = productsReducer(initialStateProducts, action);
            const addedProductId = _.last(_.keys(state));
            const addedProduct = state[addedProductId];

            return {state, addedProduct};

        };

        it(`products array length should increase`, () => {

            const {state} = doNewProduct();

            expect(normalizedArrayLength(state))
                .to.eql(normalizedArrayLength(initialStateProducts) + 1);

        });

        it(`id of new product should be a number`, () => {

            const {addedProduct} = doNewProduct();

            expect(addedProduct.id).to.match(/\d/);

        });

        it(`name & price should be empty`, () => {

            const {addedProduct} = doNewProduct();

            expect(addedProduct.name).to.eql('');
            expect(addedProduct.price).to.eql('');

        });

        it(`ownerId should eql to action's ownerId`, () => {

            const {addedProduct} = doNewProduct();

            expect(addedProduct.ownerId).to.eql('1');

        });

        it(`ownerId == null or undefined if ownerId wasn't passed`, () => {

            const {addedProduct} = doNewProduct({ownerId: null});

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

            const changedProduct = result['1'];

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

            const changedProduct = result['1'];

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

            const changedProduct = result['1'];

            expect(changedProduct.name).to.eql('Clean water');
            expect(changedProduct.price).to.eql('40');

        });

    });

    describe("REMOVE_PERSON", ()=> {

        const doRemovePerson = (actionParams = {id: '1'})=> {

            const action = {
                type: REMOVE_PERSON,
                id: actionParams.id
            };

            const state = productsReducer(initialStateProducts, action);

            return {state};

        };

        it(`should remove all person's products`, () => {
            
            const personId = '1';
            
            const ownedProductsBefore = getProductsByPersonId(personId, initialStateProducts);

            expect(normalizedArrayLength(ownedProductsBefore) > 0).to.eql(true);

            const {state} = doRemovePerson({id: personId});
            
            const ownedProductsAfter = getProductsByPersonId(personId, state);

            expect(normalizedArrayLength(ownedProductsAfter) == 0).to.eql(true);

        });

        it(`should return object as new state, not array`, () => {

            const personId = '1';

            const {state} = doRemovePerson({id: personId});

            expect(state).to.eql(
                {
                    2: {id: '2', name: 'Milk', price: '60', ownerId: '2'}
                }
            );

        });

    });

});