"use strict";

const Dexie = require('dexie');
const fixturesLoader = require('../helpers/fixtures-loader');

class DexieHelper {

    constructor() {
        this.dbName = 'TestDexieDb';
        this.schemas = {};
        this.fixtures = {};

        this.db = undefined;
    }

    withName(dbName) {
        this.dbName = dbName;

        return this;
    }

    withTables(tableSchemas) {
        this.schemas = tableSchemas;

        return this;
    }

    contains(fixturesPayload) {
        this.fixtures = fixturesPayload;

        return this;
    }

    andGenerateIt() {

        let db = new Dexie(this.dbName);
        this.db = db;

        return db.delete()
            .then(()=> {
                db.version(1).stores(this.schemas);

                return db.open();
            })
            .then(()=> {
                // loading fixtures
                return fixturesLoader.forMultiplieTables(db, this.fixtures);
            })
            .then(()=> {
                return db;
            });

    }

}

module.exports = new DexieHelper();