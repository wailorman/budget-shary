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

/**
 * @param db Dexie   database
 * @param {Object} payload   Object fixtures for loading ( { <tableName>: fixturesArray[] } )
 */
fixturesLoader.forMultiplieTables = fixturesLoader._routePayload;

fixturesLoader._createSandboxTable = function (schema) {

    schema = schema || "++id,name";

    sandboxDB.delete();

    sandboxDB.version(1).stores({
        sandbox: schema
    });

    sandboxDB.open();

    return sandboxDB.sandbox;

};

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

fixturesLoader._clearTable = function (dexieTable) {

    return dexieTable.clear();

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