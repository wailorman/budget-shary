"use strict";

const Product = require('../../../../src/core/models/product');

describe('Product model unit', ()=> {

    describe("defaults", ()=> {

        it('should use default values', ()=> {

            let newProduct = new Product();

            expect(newProduct.get('name')).to.equal('');
            expect(newProduct.get('price')).to.equal(0);

        });

        it('should construct object with specified values', ()=> {

            let newProduct = new Product({name: 'Milk', price: 50});

            expect(newProduct.get('name')).to.equal('Milk');
            expect(newProduct.get('price')).to.equal(50);

        });

    });

    describe("validation", ()=> {

        it("should allow to use string in name", () => {

            let prod = new Product({name: "Apple"});

            assert.isTrue(prod.isValid(), "Product with string as name should be valid");

        });

        it("should not apply other types in name", () => {

            let prodNum = new Product({name: 123});
            let prodBoolean = new Product({name: true});

            assert.isFalse(prodNum.isValid(), "Product with number as name should not be valid");
            assert.isFalse(prodBoolean.isValid(), "Product with boolean as name should not be valid");

        });

        it("should allow to use string in price", () => {

            let prod = new Product({price: 123});

            assert.isTrue(prod.isValid(), "Product with number as price should be valid");

        });

        it("should not apply other types in price", () => {

            let prodStr = new Product({price: "120"});
            let prodBoolean = new Product({price: true});

            assert.isFalse(prodStr.isValid(), "Product with string as price should not be valid");
            assert.isFalse(prodBoolean.isValid(), "Product with boolean as price should not be valid");

        });

    });

});