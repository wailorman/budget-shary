global.indexedDB = require('fake-indexeddb');

var Product = require('../../../../src/core/models/product');
var expect = require('chai').expect;
var DB = require('../../../../src/core/local-db');

describe('Product model unit', function() {

    var exampleProduct = {name: 'Milk', price: 50};

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

        it('should upload new model to DB and update model', function (done) {

            var newProduct = new Product(exampleProduct);

            expect(newProduct.get('id')).to.not.exist;

            newProduct.save()
                .then(function () {

                    expect(newProduct.get('id')).to.exist;
                    expect(newProduct.get('name')).to.eql(exampleProduct.name);
                    expect(newProduct.get('price')).to.eql(exampleProduct.price);

                    done();

                }).catch(done);

        });

    });

    describe('.fetch()', function () {

        var productsTable = DB.products;
        var exampleProductId;

        // create product for testing
        before(function (done) {

            productsTable.clear().then(function () {
                productsTable.add(exampleProduct)
                    .then(function (id) {
                        exampleProductId = id;

                        done();

                    }).catch(done);
            });

        });

        it('should fetch model and update model', function (done) {

            var newProduct = new Product({id: exampleProductId});

            newProduct.fetch()
                .then(function () {

                    expect(newProduct.get('id')).to.eql(exampleProductId);
                    expect(newProduct.get('name')).to.eql(exampleProduct.name);
                    expect(newProduct.get('price')).to.eql(exampleProduct.price);

                    done();

                }).catch(done);

        });

    });

    describe('.destroy()', function () {

        var productsTable = DB.products;
        var exampleProductId;

        // create product for testing
        before(function (done) {

            productsTable.clear().then(function () {
                productsTable.add(exampleProduct)
                    .then(function (id) {
                        exampleProductId = id;
                        done();
                    }).catch(done);
            });

        });

        it('should remove object from db', function (done) {

            var newProduct = new Product({id: exampleProductId});

            newProduct.fetch().then(function (product) {
                return product.destroy();
            }).then(function () {
                done();
            }).catch(done);

        });

    });

});