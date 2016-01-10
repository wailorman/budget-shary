"use strict";

const Product = require('../../../../src/core/models/product');
const Dispatcher = require('../../../../src/dispatcher/dispatcher');
const actionNames = require('../../../../src/constants/action-names');

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

    describe("dispatcher", ()=> {

        it("should handle dispatched 'update' event and change model", () => {

            let product = new Product({name: 'Potato', price: 50});

            let spy = sinon.spy();

            product.on('change', spy);

            Dispatcher.dispatch({
                eventName: actionNames.product.update,
                model: product,
                attributes: { name: 'Water', price: 100 }
            });

            expect(spy.calledOnce).to.be.true;
            expect(spy.lastCall.args[0].attributes).to.eql({name: 'Water', price: 100});

        });

        it("should update model which passed with payload only", () => {

            let product1 = new Product();
            let product2 = new Product();

            let spy1 = sinon.spy();
            let spy2 = sinon.spy();

            product1.on('change', spy1);
            product2.on('change', spy2);

            Dispatcher.dispatch({
                eventName: actionNames.product.update,
                model: product2,
                attributes: { name: 'Lemon', price: 10 }
            });

            expect(spy1.callCount).to.eql(0);
            expect(spy2.calledOnce).to.be.true;
            expect(spy2.lastCall.args[0].attributes).to.eql({name: 'Lemon', price: 10});

        });

    });

});