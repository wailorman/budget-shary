global.indexedDB = require('fake-indexeddb');

var Product = require('../../../../src/core/models/product');
var expect = require('chai').expect;
var DB = require('../../../../src/core/local-db');
var fixtures = require('../fixtures/products');
var fixturesLoader = require('../../../helpers/fixtures-loader');
var _ = require('underscore');

describe('Product model unit', function() {

    var exampleProduct = {name: 'Milk', price: 50};
    var sandboxTable = DB.products;

    beforeEach(function () {
        return fixturesLoader(sandboxTable, fixtures);
    });

    it('should use default values', function() {

        var newProduct = new Product();

        expect(newProduct.get('name')).to.equal('');
        expect(newProduct.get('price')).to.equal(0);

    });

    it('should construct object with specified values', function() {

        var newProduct = new Product(exampleProduct);

        expect(newProduct.get('name')).to.equal('Milk');
        expect(newProduct.get('price')).to.equal(50);

    });

    describe('.save()', function () {

        it('should upload new model to DB and update model', function () {

            var newProduct = new Product(exampleProduct);

            expect(newProduct.get('id')).to.not.exist;

            return newProduct.save()
                .then(function (resp) {

                    var expectedNewId = _.last(fixtures).id + 1;

                    expect(resp.get('id')).to.eql(expectedNewId);

                    expect(newProduct.get('id')).to.exist;
                    expect(newProduct.get('name')).to.eql(exampleProduct.name);
                    expect(newProduct.get('price')).to.eql(exampleProduct.price);

                });

        });

    });

    describe('.fetch()', function () {

        var exampleProductId = 1;

        it('should fetch model and update model', function () {

            var newProduct = new Product({id: exampleProductId});

            newProduct.fetch()
                .then(function (resp) {

                    expect(newProduct.get('id')).to.eql(exampleProductId);
                    expect(newProduct.get('name')).to.eql(fixtures[0].name);
                    expect(newProduct.get('price')).to.eql(fixtures[0].price);

                });

        });

    });

    describe('.destroy()', function () {

        var productsTable = DB.products;
        var exampleProductId = 1;

        it('should remove object from db', function () {

            var newProduct = new Product({id: exampleProductId});

            return newProduct.fetch().then(function (product) {
                return product.destroy();
            }).then(function () {
                productsTable.get(exampleProductId)
            }).then(function (destroyedObjectResponse) {
                expect(destroyedObjectResponse).to.eql(undefined);
            });

        });

    });

});