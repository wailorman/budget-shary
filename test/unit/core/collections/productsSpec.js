"use strict";

const ProductsCollection = require('../../../../src/core/collections/products');
const Product = require('../../../../src/core/models/product');
const Dispatcher = require('../../../../src/dispatcher/dispatcher');
const actionNames = require('../../../../src/constants/action-names');

describe('ProductsCollection collection', ()=> {

    let testProductsAttrs = [
        {
            name: 'Milk',
            price: 100
        },
        {
            name: 'Apple',
            price: 20
        },
        {
            name: 'Water',
            price: 30
        }
    ];

    let testProducts = [
        new Product(testProductsAttrs[0]),
        new Product(testProductsAttrs[1]),
        new Product(testProductsAttrs[2])
    ];

    it("should create products collection", () => {

        let products = new ProductsCollection(testProducts);

        assert.equal( products.get(testProducts[0].cid), testProducts[0], "Models were inserted incorrectly" );

    });

    describe("totalPrice", ()=> {

        it("should return total price of products from collection", () => {

            let products = new ProductsCollection(testProducts);

            assert.equal(products.totalPrice(), 150, "Incorrect totalPrice was calculated");

        });

    });

    describe("dispatcher", ()=> {

        it("should add new empty model on 'product-create'", () => {

            let products = new ProductsCollection(testProducts);
            let spy = sinon.spy();

            expect(products.length).to.eql(testProducts.length);

            products.on('add', spy);

            Dispatcher.dispatch({
                eventName: actionNames.product.create,
                collection: products
            });

            expect(spy.lastCall.args[1].length).to.eql(4);
            expect(products.at(3).get('price')).to.eql(0);

        });

        it("should handle only for collection which passed with payload", () => {

            let products1 = new ProductsCollection(testProducts);
            let products2 = new ProductsCollection(testProducts);

            let spy1 = sinon.spy();
            let spy2 = sinon.spy();

            products1.on('add', spy1);
            products2.on('add', spy2);

            Dispatcher.dispatch({
                eventName: actionNames.product.create,
                collection: products2
            });

            expect(spy1.callCount).to.eql(0);
            expect(spy2.calledOnce).to.be.true;
            expect(spy2.lastCall.args[1].length).to.eql(4);

        });

        it("should delete model from collection", () => {

            let products = new ProductsCollection(testProducts);
            let spy = sinon.spy();

            products.on('remove', spy);

            Dispatcher.dispatch({
                eventName: actionNames.product.delete,
                model: products.at(0)
            });

            expect(spy.lastCall.args[1].length).to.eql(2);

        });

        it("should not delete anything if payload.model does not exists in collection", () => {

            let products = new ProductsCollection(testProducts);
            let spy = sinon.spy();

            let productToDelete = new Product(testProductsAttrs[0]);

            products.on('remove', spy);

            Dispatcher.dispatch({
                eventName: actionNames.product.delete,
                model: productToDelete
            });

            expect(spy.callCount).to.eql(0);
            expect(products.length).to.eql(3);

        });

    });

});