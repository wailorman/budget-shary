global.indexedDB = require('fake-indexeddb');

var fixturesLoader = require('../../helpers/fixtures-loader');
var Dexie = require('dexie');

var chai = require('chai');
var assert = chai.assert;
var expect = chai.expect;

describe('fixturesLoader', function () {

    var _createSandboxTable;

    before(function () {

        _createSandboxTable = fixturesLoader._createSandboxTable;

    });

    describe('createSandboxTable', function () {

        it("should create sandbox table without schema", function () {

            var createdTable = _createSandboxTable();

            return createdTable.add({name: 'Test'})
                .then(function (resultId) {

                    assert.equal(resultId, 1, "Incorrect id of the new object");

                    return createdTable.get(resultId);

                })
                .then(function (createdObject) {

                    assert.equal(createdObject.name, "Test", "Wrong object has resolved");

                });

        });

        it("should create table with defined schema", function () {

            var createdTable = _createSandboxTable('++id,desc');

            return createdTable.add({desc: 'Test'})
                .then(function (resultId) {

                    return createdTable.get(resultId);

                })
                .then(function (createdObject) {

                    assert.isUndefined(createdObject.name, "Old schema has used");
                    assert.equal(createdObject.desc, "Test", "Wrong object has resolved");

                });

        });

    });

    describe('fixturesLoader', function () {

        var fixtures = [
            {
                id: 1,
                name: 'Test1'
            },
            {
                id: 2,
                name: 'Test2'
            },
            {
                id: 3,
                name: 'Test3'
            }
        ];

        var sandboxTable;

        before(function () {

            sandboxTable = _createSandboxTable();

        });

        it("should load fixtures", function () {

            return fixturesLoader(sandboxTable, fixtures)
                .then(function () {

                    return sandboxTable.toArray();

                })
                .then(function (tableContent) {

                    assert.deepEqual(tableContent, fixtures);

                });

        });

    });

});