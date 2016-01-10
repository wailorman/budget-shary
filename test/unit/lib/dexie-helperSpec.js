"use strict";

const DexieGenerator = require('../../helpers/dexie-helper');
const Dexie = require('dexie');

describe("DexieHelper", ()=> {

    it("should generate correct db", () => {

        let sandboxDB;

        return DexieGenerator
            .withName('TestDexieDb')
            .withTables({
                potatoes: '++id,name'
            })
            .contains({
                potatoes: [
                    {
                        id: 1,
                        name: 'Pot'
                    }
                ]
            })
            .andGenerateIt()
            .then((db)=> {
                sandboxDB = db;

                // todo: check db name

                assert(db.potatoes, "Can't access to created db");

                return db.potatoes.get(1);

            })
            .then((potato)=> {

                assert.equal(potato.name, 'Pot', "Fixtures was loaded incorrectly");

            });

    });

    it("should clean db before create a new one", () => {

        let sandboxDB;

        return DexieGenerator
            .withName('TestDexieDb')
            .withTables({
                bananas: '++id,name'
            })
            .contains({
                bananas: [
                    {
                        id: 1,
                        name: 'Ban'
                    }
                ]
            })
            .andGenerateIt()
            .then((db)=> {
                sandboxDB = db;

                assert.isUndefined(db.potatoes, "DB wasn't cleaned after last generation");
                assert(db.bananas, "Can't access to created db");

                return db.bananas.get(1);

            })
            .then((banana)=> {

                assert.equal(banana.name, 'Ban', "Fixtures was loaded incorrectly");

            });

    });

    describe("clearTables", ()=> {

        let generatedDb;

        let countUpObjectsInTable = function (dexieTable) {
            //var deferred = Q.defer();

            return dexieTable.toArray().then((tableArray)=> {
                return tableArray.length;
            });

            //return deferred.promise;
        };

        let countUpObjectsInTables = function (dexieTablesArray) {

            let deferred = Q.defer();
            let amountOfObjectsIn = {};

            async.each(dexieTablesArray, (table, ecb)=> {

                countUpObjectsInTable(table)
                    .then((objectsAmount)=> {
                        amountOfObjectsIn[table.name]
                    })

            });

            return deferred.promise;

        };

        beforeEach(()=> {

            generatedDb = DexieGenerator
                .withTables({
                    bananas: '++id,name',
                    potatoes: '++id,name'
                })
                .contains({
                    bananas: [
                        {
                            id: 1,
                            name: 'Ban'
                        }
                    ],
                    potatoes: [
                        {
                            id: 1,
                            name: 'Pot'
                        }
                    ]
                })
                .andGenerateIt()
                .then((db)=> {
                    generatedDb = db;
                });

            return generatedDb;

        });

        it("should clear one table", () => {

            let amountOfObjectsIn = {};

            return DexieGenerator
                .clearTables(['bananas'])
                .then(()=> {
                    return countUpObjectsInTable(DexieGenerator.db.bananas);
                })
                .then((amountOfObjectsInBananasTable)=> {
                    assert.equal(amountOfObjectsInBananasTable, 0, "bananas table wasn't cleared");
                    assert(generatedDb.potatoes, "Not right table was cleared");
                });

        });

    });

    describe("countUpObjectsInTable", ()=> {

        it("should count correctly", () => {

            return DexieGenerator.withTables({
                    sand: '++id,name'
                })
                .contains({
                    sand: [
                        {
                            id: 1,
                            name: 'One'
                        },
                        {
                            id: 2,
                            name: 'Two'
                        }
                    ]
                })
                .andGenerateIt()
                .then(()=> {
                    return DexieGenerator
                        .countUpObjectsInTable('sand');
                })
                .then((amountOfObjectsInSandTable)=> {

                    assert.equal(amountOfObjectsInSandTable, 2, 'counting up has gone wrong');

                });

        });

    });

});