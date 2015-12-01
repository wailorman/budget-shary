global.indexedDB = require('fake-indexeddb');

var _ = require('underscore');
var chai = require('chai');
var assert = chai.assert;

var fixtures = require('../fixtures/products');
var fixturesLoader = require('../../../helpers/fixtures-loader');
var Budget = require('../../../../src/core/models/product');
var Products = require('../../../../src/core/collections/products');
var DB = require('../../../../src/core/local-db');

describe('Products collection', function () {

    var sandboxTable = DB.products;

    beforeEach(function(){
        return fixturesLoader(sandboxTable, fixtures);
    });

    describe('fetch', function () {

        it("should fetch all products", function () {

            var products = new Products();

            return products.fetch()
                .then(function (resolvedProducts) {

                    assert.deepEqual(products.get(1).attributes, fixtures[0],
                        "Wrong object in collection at id:1. " +
                        "Expected object from fixtures[0]");
                    assert.equal(resolvedProducts.length, 3,
                        "Wrong quantity of resolved objects");

                });

        });

    });

});