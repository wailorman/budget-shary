"use strict";

const Dexie = require('dexie');
const async = require('async');
const Q = require('q');
const _ = require('underscore');

const sandboxDB = new Dexie('SandboxDatabase');

var fixturesLoader = function (dexieTable, fixturesArray) {
    var deferred = Q.defer();

    dexieTable.clear();

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
};

fixturesLoader._createSandboxTable = function (schema) {

    schema = schema || "++id,name";

    sandboxDB.delete();

    sandboxDB.version(1).stores({
        sandbox: schema
    });

    sandboxDB.open();

    return sandboxDB.sandbox;

};

/**
 * @param db Dexie   database
 * @param {Object} payload   Object fixtures for loading ( { <tableName>: fixturesArray[] } )
 */
fixturesLoader.forMultiplieTables = function (db, payload) {

    let tablesToClean = _.keys(payload);

    return fixturesLoader
        ._clearTables(db, tablesToClean)
        .then(()=> {
            return fixturesLoader._routePayload(db, payload);
        })

};

// passing each object property to the right table insertion
fixturesLoader._routePayload = function (db, payload) {

    var deferred = Q.defer();

    /*
     * payload schema:
     * { <tableName>: fixturesArray[] }
     *
     * */

    let numberOfTablesInPayload = _.keys(payload).length;

    async.times(numberOfTablesInPayload, function (i, next) {

        let tableName = _.keys(payload)[i];
        let table = db[tableName];
        let fixtures = payload[tableName];

        fixturesLoader._loadFixturesToTable(table, fixtures)
            .then(()=> {
                next();
            })
            .catch(next);

    }, function (err) {
        if (err) deferred.reject(err);
        else deferred.resolve(null);
    });

    return deferred.promise;

};

// clears tables in specified db
fixturesLoader._clearTables = function (db, arrayOfTableNames) {
    var deferred = Q.defer();

    async.each(arrayOfTableNames, function (tableName, cb) {

        let table = db[tableName];

        table.clear()
            .then(()=> {
                cb();
            })
            .catch(cb);

    }, function (err) {
        if (err) deferred.reject(err);
        else deferred.resolve(null);
    });

    return deferred.promise;
};


fixturesLoader._loadFixturesToTable = function (dexieTable, fixturesArray) {

    var deferred = Q.defer();

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

};

module.exports = fixturesLoader;