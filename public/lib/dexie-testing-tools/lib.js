"use strict";

const _ = require('lodash');
const Q = require('q');
const async = require('async');
const Dexie = require('dexie');

let lib = {

    loadFixturesToTable: function (dexieTable, fixturesArray) {

        let deferred = Q.defer();

        async.each(fixturesArray, function (fixture, callback) {

            dexieTable.add(fixture)
                .then(function () {
                    callback();
                }, function (err) {
                    callback(err);
                });

        }, function (err) {
            if (err) deferred.reject(err);
            else deferred.resolve(null);
        });

        return deferred.promise;

    },

    loadFixturesToMultiplieTables: function (dexieDatabase, fixturesPayload) {

        let deferred = Q.defer();
        let db = dexieDatabase;
        let tableNamesArray = _.keys(fixturesPayload);


        // table level
        async.each(tableNamesArray, (tableName, ecb1)=> {

            let fixturesArray = fixturesPayload[tableName];

            // object level
            async.each(fixturesArray, (fixture, ecb2)=> {

                db[tableName].add(fixture)
                    .then(()=> {
                        ecb2();
                    }, (err)=> {
                        ecb2(err);
                    });

            }, ecb1);

        }, (err)=> {
            if (err) deferred.reject(err);
            else deferred.resolve(null);
        });

        return deferred.promise;

    },

    generateDb: function (opts) {

        /*
         * opts:
         *   dbName:String = "SampleDexieDb"
         *   schemas:Object(dexie .stores) = {}
         *   fixtures = { table: fixtures[] }
         * */

        if (!opts) opts = {};

        _.defaults(opts, {
            deletePrevious: true,
            dbName: "SampleDexieDb",
            schemas: {},
            fixtures: {}
        });

        // create db
        let db = new Dexie(opts.dbName);

        let promiseChain;

        // delete previous db if it's necessary
        //if (opts.deletePrevious) {
        //
        //    db.
        //
        //}
        return db.delete()
            .then(()=> { // apply schemas

                db.version(1).stores(opts.schemas);

                return db.open();

            })
            .then(()=> { // load fixtures

                return lib.loadFixturesToMultiplieTables(db, opts.fixtures);

            })
            .then(()=> {

                return db;

            });
        //}

    }

};

module.exports = lib;