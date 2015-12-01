var Dexie = require('dexie');
var async = require('async');
var Q = require('q');

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

var _createSandboxTable = function(schema) {

    schema = schema || "++id,name";

    var db = new Dexie('SandboxDatabase');

    db.delete();

    db.version(1).stores({
        sandbox: schema
    });

    db.open();

    return db.sandbox;

};

fixturesLoader._createSandboxTable = _createSandboxTable;

module.exports = fixturesLoader;