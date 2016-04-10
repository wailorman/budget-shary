"use strict";

const Dexie = require('dexie');
const fixturesLoader = require('../helpers/fixtures-loader');
const _ = require('underscore');
const Q = require('q');

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

    /**
     * Clear tables in DB
     *
     * @param {string[]} [tablesArray]   Leave this field empty if you want to clean all tables
     * @returns {*}
     */
    clearTables(tablesArray) {

        if (!this.db) throw new Error("You have to generate db before cleaning tables");

        if (!tablesArray) {
            tablesArray = _.pluck(this.db.tables, 'name');
        }

        return fixturesLoader._clearTables(this.db, tablesArray);

    }


    /**
     *
     * @param {string} table
     */
    countUpObjectsInTable(table) {
        return this.db[table].toArray().then((tableArray)=> {
            return tableArray.length;
        });
    }

}

module.exports = new DexieHelper();