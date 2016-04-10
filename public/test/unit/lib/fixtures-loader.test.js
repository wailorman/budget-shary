"use strict";

var fixturesLoader = require('../../helpers/fixtures-loader');
var Dexie = require('dexie');

const generateDexieDb = require('../../helpers/dexie-helper');

describe('fixturesLoader', function () {

    let _createSandboxTable,
        _loadFixturesToTable,
        _routePayload,
        forMultiplieTables,

        sandboxDatabase;

    let generateSandboxDatabase = function (dbName, schemas) {

        dbName = dbName || "SandboxDatabase";

        let db = new Dexie(dbName);

        return db.delete()
            .then(()=> {

            });

    };

    let reloadFixtures = function () {

        return generateDexieDb
            .withName('SandboxDatabaseForTesting')
            .withTables({
                first: '++id,name',
                second: '++id,name',
                third: '++id,name'
            })
            .contains({
                first: [
                    {
                        id: 1,
                        name: '1-First'
                    },
                    {
                        id: 2,
                        name: '2-First'
                    }
                ],
                second: [
                    {
                        id: 1,
                        name: '1-Second'
                    },
                    {
                        id: 2,
                        name: '2-Second'
                    }
                ]
            })
            .andGenerateIt()
            .then((db)=> {
                sandboxDatabase = db;
            })

    };

    before(function () {

        _createSandboxTable = fixturesLoader._createSandboxTable;
        _loadFixturesToTable = fixturesLoader._loadFixturesToTable;
        _routePayload = fixturesLoader._routePayload;
        forMultiplieTables = fixturesLoader.forMultiplieTables;

    });

    describe("forMultiplieTables", ()=> {

        beforeEach(()=> {

            return reloadFixtures();

        });

        it("should clean tables which will receive fixtures", () => {

            return forMultiplieTables(sandboxDatabase, {
                first: [
                    {
                        id: 1,
                        name: 'Such wow'
                    }
                ],
                third: [
                    {
                        id: 1,
                        name: 'New record'
                    }
                ]
            }).then(()=> {

                return sandboxDatabase.first.get(1);

            }).then((firstRecord)=> {

                assert.equal(firstRecord.name, 'Such wow', "Fixtures didn't override old data");

                return sandboxDatabase.third.get(1);

            }).then((newRecordInThirdTable)=> {

                assert.equal(newRecordInThirdTable.name, 'New record', "New fixtures wasn't loaded");

            });

        });

        it("should insert all fixtures", () => {

            return forMultiplieTables(sandboxDatabase, {
                third: [
                    {
                        id: 1,
                        name: 'New record'
                    },
                    {
                        id: 2,
                        name: 'Another record'
                    }
                ]
            }).then(()=> {

                return sandboxDatabase.third.toArray();

            }).then((newRecords)=> {

                assert.equal(newRecords[0].name, 'New record', "First fixture wasn't loaded");
                assert.equal(newRecords[1].name, 'Another record', "Second fixture wasn't loaded");

            });

        });

    });

    describe("_routePayload", ()=> {

        let sandboxDB, payload, spies = {};

        let prepareSandboxDatabase = function () {

            sandboxDB = new Dexie('TestingRoutePayloadDB');

            return sandboxDB.delete()
                .then(() => {

                    sandboxDB.version(1).stores({
                        first: '++id,name',
                        second: '++id,name',
                        third: '++id,name'
                    });

                    return sandboxDB.open();

                });
        };


        payload = {
            first: [
                {
                    id: 1,
                    name: '1-First'
                },
                {
                    id: 2,
                    name: '2-First'
                }
            ],
            second: [
                {
                    id: 1,
                    name: '1-Second'
                },
                {
                    id: 2,
                    name: '2-Second'
                }
            ]
        };


        before(()=> {

            return prepareSandboxDatabase().then(()=> {

                spies.first = sinon.spy(sandboxDB.first, "add");
                spies.second = sinon.spy(sandboxDB.second, "add");
                spies.third = sinon.spy(sandboxDB.third, "add");

                spies._loadFixturesToTable = sinon.spy(fixturesLoader, "_loadFixturesToTable");

            });

        });

        beforeEach(() => {

            spies.first.reset();
            spies.second.reset();
            spies.third.reset();
            spies._loadFixturesToTable.reset();

        });

        it("should call _loadFixturesToTable", () => {

            let simplePayload = {
                first: [{
                    id: 1,
                    name: 'First'
                }]
            };

            return _routePayload(sandboxDB, simplePayload)
                .then(()=> {

                    assert.isTrue(spies._loadFixturesToTable.calledWith(sandboxDB.first, simplePayload.first),
                        "_loadFixturesToTable called with wrong arguments");

                });

        });

        it("should pass fixtures to the right tables", () => {

            _routePayload(sandboxDB, payload);

            assert(spies.third.callCount === 0, "'third' table shouldn't be touched");
            assert.isTrue(spies.first.calledTwice, "'first' table wasn't touched");
            assert.isTrue(spies.second.calledTwice, "'second' table wasn't touched");

        });

    });

    describe("_loadFixturesToTable()", ()=> {

        let sandboxTable;
        let fixturesArray;

        beforeEach(() => {
            sandboxTable = _createSandboxTable();

            fixturesArray = [
                {
                    id: 1,
                    name: 'First'
                },
                {
                    id: 2,
                    name: 'Second'
                }
            ];
        });

        it("should load fixtures array to table", () => {

            return _loadFixturesToTable(sandboxTable, fixturesArray)
                .then(() => {
                    return sandboxTable.toArray()
                })
                .then((sandboxTableContent) => {

                    expect(sandboxTableContent[0].id).to.equal(fixturesArray[0].id);
                    expect(sandboxTableContent[1].id).to.equal(fixturesArray[1].id);

                });

        });

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