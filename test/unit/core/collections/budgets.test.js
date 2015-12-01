global.indexedDB = require('fake-indexeddb');

var _ = require('underscore');
var chai = require('chai');
var assert = chai.assert;

var fixtures = require('../fixtures/budgets');
var fixturesLoader = require('../../../helpers/fixtures-loader');
var Budget = require('../../../../src/core/models/budget');
var Budgets = require('../../../../src/core/collections/budgets');
var DB = require('../../../../src/core/local-db');

describe('Budgets collection', function () {

    var sandboxTable = DB.budgets;

    beforeEach(function(){
        return fixturesLoader(sandboxTable, fixtures);
    });

    describe('fetch', function () {

        it("should fetch all budgets", function () {

            var budgets = new Budgets();

            return budgets.fetch()
                .then(function (resolvedBudgets) {

                    assert.deepEqual(budgets.get(1).attributes, fixtures[0],
                        "Wrong object in collection at id:1. " +
                        "Expected object from fixtures[0]");
                    assert.equal(resolvedBudgets.length, 3,
                        "Wrong quantity of resolved objects");

                });

        });

    });

});