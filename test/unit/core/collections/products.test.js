"use strict";

const ProductsCollection = require('../../../../src/core/collections/products');
const Product = require('../../../../src/core/models/product');

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

});