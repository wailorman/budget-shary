"use strict";

const generateDexieDb = require('../../helpers/dexie-helper');
const Dexie = require('dexie');

describe("DexieHelper", ()=> {

    it("should generate correct db", () => {

        let sandboxDB;

        return generateDexieDb
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

                assert(db.potatoes, "Can't access to created db");

                return db.potatoes.get(1);

            })
            .then((potato)=> {

                assert.equal(potato.name, 'Pot', "Fixtures was loaded incorrectly");

            });

    });

    it("should clean db before create a new one", () => {

        let sandboxDB;

        return generateDexieDb
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

});