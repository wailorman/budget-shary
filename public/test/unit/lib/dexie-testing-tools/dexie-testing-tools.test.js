"use strict";

const DexieTestingTools = require('../../.././dexie-testing-tools');
const _lib = require('../../.././dexie-testing-tools/lib');
const Dexie = require('dexie');

describe("DexieTestingTools", ()=> {

    let _loadFixturesToTable = _lib.loadFixturesToTable;
    let _loadFixturesToMultiplieTables = _lib.loadFixturesToMultiplieTables;
    let _generateDb = _lib.generateDb;

    describe("_loadFixturesToTable()", ()=> {

        let sandboxTable,
            sandboxDatabase;

        let fixturesArray,
            fixturesPayload;

        beforeEach(() => {

            sandboxDatabase = new Dexie('DexieTestingToolsTestDB');

            sandboxDatabase.version(1).stores({
                sand: "++id,name",
                first: "++id,name",
                second: "++id,name"
            });
            sandboxDatabase.open();

            sandboxTable = sandboxDatabase.sand;

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

            fixturesPayload = {
                first: fixturesArray,
                second: [
                    {
                        id: 1,
                        name: 'Awesome'
                    },
                    {
                        id: 2,
                        name: 'Fascinating'
                    }
                ]
            };

        });

        it("should load fixtures array to the table", () => {

            return _loadFixturesToTable(sandboxTable, fixturesArray)
                .then(() => {
                    return sandboxTable.toArray()
                })
                .then((sandboxTableContent) => {

                    expect(sandboxTableContent[0].id).to.equal(fixturesArray[0].id);
                    expect(sandboxTableContent[1].name).to.equal(fixturesArray[1].name);

                });

        });

        it("should fill with fixtures multiplie tables", () => {

            return _loadFixturesToMultiplieTables(sandboxDatabase, fixturesPayload)
                .then(()=> {
                    return Q.all([
                            sandboxDatabase.first.toArray(),
                            sandboxDatabase.second.toArray()
                        ])
                        .then((tablesContent)=> {

                            let firstTblObjects = tablesContent[0];
                            let secondTblObjects = tablesContent[1];

                            assert.equal(firstTblObjects[0].id, fixturesPayload.first[0].id,
                                "First table was filled incorrectly");

                            assert.equal(firstTblObjects[1].name, fixturesPayload.first[1].name,
                                "First table was filled incorrectly");

                            assert.equal(secondTblObjects[0].id, fixturesPayload.second[0].id,
                                "Second table was filled incorrectly");

                            assert.equal(secondTblObjects[1].name, fixturesPayload.second[1].name,
                                "Second table was filled incorrectly");

                        });
                });

        });

    });

    describe("generateDb", ()=> {

        it("should generate db with default options", () => {

            return _generateDb()
                .then((db)=> {

                    assert.equal(db.tables.length, 0, "Tables shouldn't exist");
                    assert.equal(db.name, 'SampleDexieDb', "Incorrect database name");

                })

        });

        it("should generate db with specific name and schemas", () => {

            return _generateDb({
                dbName: 'AnotherDbName',
                schemas: {
                    one: '++id,name',
                    another: '++id,name'
                }
            }).then((db)=> {

                assert.equal(db.tables.length, 2, "Incorrect amount of tables");
                assert.equal(db.name, 'AnotherDbName', "Incorrect database name");

            })

        });

        it("should delete previous db", () => {

            let delDb = new Dexie('DbForDeletion');

            delDb.version(1).stores({
                hey: '++id,name'
            });

            delDb.open();

            delDb.hey.add({
                    id: 1,
                    name: 'Lolita'
                })
                .then(()=> {

                    return delDb.hey.toArray();

                })
                .then((heyTableContent)=> {

                    assert.equal(heyTableContent.length, 1);
                    assert.equal(heyTableContent[0].name, 'Lolita');

                    return _generateDb({
                        dbName: 'DbForDeletion',
                        schemas: {
                            hey: '++id,name',
                            wow: '++id,name'
                        }
                    });

                })
                .then((db)=> {

                    return db.hey.toArray();

                })
                .then((heyTableContent)=> {

                    assert.equal(heyTableContent.length, 0);

                });

        });

        it("should load fixtures", () => {

            return _generateDb({
                dbName: 'Fixtures',
                schemas: {
                    one: '++id,name',
                    two: '++id,name'
                },
                fixtures: {
                    one: [
                        {
                            id: 1,
                            name: '1First'
                        },
                        {
                            id: 2,
                            name: '1Second'
                        }
                    ],
                    two: [
                        {
                            id: 1,
                            name: '2First'
                        },
                        {
                            id: 2,
                            name: '2Second'
                        }
                    ]
                }
            })
                .then((db)=> {

                    return Q.all([db.one.toArray(), db.two.toArray()]);
                    //return db.one.toArray();

                })
                .then((tablesContent)=> {

                    let firstTable = tablesContent[0],
                        secondTable = tablesContent[1];

                    assert.equal(firstTable[0].name, '1First', "Fixtures was loaded incorrectly");
                    assert.equal(secondTable[1].id, 2, "Fixtures was loaded incorrectly");

                })

        });

    });

});