global.indexedDB = require('fake-indexeddb');

var _ = require('underscore');
var chai = require('chai');
var assert = chai.assert;

var fixtures = require('../fixtures/persons');
var fixturesLoader = require('../../../helpers/fixtures-loader');
var Budget = require('../../../../src/core/models/person');
var Persons = require('../../../../src/core/collections/persons');
var DB = require('../../../../src/core/local-db');

describe('Persons collection', function () {

    var sandboxTable = DB.persons;

    beforeEach(function(){
        return fixturesLoader(sandboxTable, fixtures);
    });

    describe('fetch', function () {

        it("should fetch all persons", function () {

            var persons = new Persons();

            return persons.fetch()
                .then(function (resolvedPersons) {

                    assert.deepEqual(persons.get(1).attributes, fixtures[0],
                        "Wrong object in collection at id:1. " +
                        "Expected object from fixtures[0]");
                    assert.equal(resolvedPersons.length, 3,
                        "Wrong quantity of resolved objects");

                });

        });

    });

});