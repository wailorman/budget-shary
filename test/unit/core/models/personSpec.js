"use strict";

const Person = require('../../../../src/core/models/person');
const ProductsCollection = require('../../../../src/core/collections/products');
const Product = require('../../../../src/core/models/product');
const Dispatcher = require('../../../../src/dispatcher/dispatcher');
const actionNames = require('../../../../src/constants/action-names');

describe('Person model unit', ()=> {

    it('should construct object with specified values', ()=> {

        let newPerson = new Person({name: 'Thomas', share: 0.5});

        expect(newPerson.get('name')).to.equal('Thomas');
        expect(newPerson.get('share')).to.equal(0.5);

    });

    it('should use default values name:"" & share:0', ()=> {

        let newPerson = new Person();

        expect(newPerson.get('name')).to.equal('');
        expect(newPerson.get('share')).to.equal(0);

    });

    describe("validation", ()=> {

        it("should allow to use string in name", () => {

            let person = new Person({name: "Apple"});

            assert.isTrue(person.isValid(), "Person with string as name should be valid");

        });

        it("should not apply other types in name", () => {

            let personNum = new Person({name: 123});
            let personBoolean = new Person({name: true});

            assert.isFalse(personNum.isValid(), "Person with number as name should not be valid");
            assert.isFalse(personBoolean.isValid(), "Person with boolean as name should not be valid");

        });

        it("should allow to use number (0<x<1) in share", () => {

            let person = new Person({share: 0.5});

            assert.isTrue(person.isValid(), "Person with number as share should be valid");

        });

        it("should not apply other types in share", () => {

            let personStr = new Person({share: "120"});
            let personBoolean = new Person({share: true});

            assert.isFalse(personStr.isValid(), "Person with string as price should not be valid");
            assert.isFalse(personBoolean.isValid(), "Person with boolean as price should not be valid");

        });

        it("should apply share = 0", () => {

            let person = new Person({share: 0});

            assert.isTrue(person.isValid(), "0 is valid share!");

        });

        it("should apply share = 1", () => {

            let person = new Person({share: 1});

            assert.isTrue(person.isValid(), "1 is valid share!");

        });

        it("should not apply share < 0", () => {

            let person = new Person({share: -1});

            assert.isFalse(person.isValid(), "-1 is not valid share!");

        });

        it("should not apply share > 1", () => {

            let person = new Person({share: 2});

            assert.isFalse(person.isValid(), "2 is not valid share!");

        });

        describe("products", ()=> {

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

            it("should apply ProductsCollection to .products", () => {

                let person = new Person({
                    products: new ProductsCollection(testProducts)
                });

                assert.isTrue(person.isValid(), "ProductsCollection is valid type");
                
            });
            
            it("should not apply any other types to .products", () => {

                let person = new Person({
                    products: {}
                });

                assert.isFalse(person.isValid(), "{} is not valid type");

            });

        });

        describe("dispatcher", ()=> {

            it("should handle dispatched 'update' event and change model", () => {

                let person = new Person({name: 'Mike', share: 0.5});

                let spy = sinon.spy();

                person.on('change', spy);

                Dispatcher.dispatch({
                    eventName: actionNames.person.update,
                    model: person,
                    attributes: { name: 'John', share: 0.75 }
                });

                expect(spy.calledOnce).to.be.true;
                expect(spy.lastCall.args[0].attributes).to.eql({name: 'John', share: 0.75});

            });

            it("should update model which passed with payload only", () => {

                let person1 = new Person();
                let person2 = new Person();

                let spy1 = sinon.spy();
                let spy2 = sinon.spy();

                person1.on('change', spy1);
                person2.on('change', spy2);

                Dispatcher.dispatch({
                    eventName: actionNames.person.update,
                    model: person2,
                    attributes: { name: 'John', share: 0.1 }
                });

                expect(spy1.callCount).to.eql(0);
                expect(spy2.calledOnce).to.be.true;
                expect(spy2.lastCall.args[0].attributes).to.eql({name: 'John', share: 0.1});

            });

        });

    });

});