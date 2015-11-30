var Q = require('q');

var BackboneSyncDexieAdapter = {

    forCollection: function (dexieTable) {

        // we can only READ collection
        var methodMapper = {
            read: "find"
        };

        return function (method, collection, options) {

            var crudMethod = _tableWrapper(dexieTable)[methodMapper[method]];

            // crud method will be "read" -> _find(opts)
            return crudMethod(options)
                .then(function serializeDexieResponse(responseArray) {
                    collection.set(responseArray);
                    // pass collection to the next promise
                    return collection;
                });

        }

    },

    forModel: function (dexieTable) {

        var methodMapper = {
            create: "create",
            read: "findOne",
            update: "update",
            delete: "delete"
        };

        return function (method, model, options) {

            var crudMethod = _tableWrapper(dexieTable)[methodMapper[method]];
            var jsonObj = model.attributes;

            // resolve with updated model
            return crudMethod(jsonObj, options)
                .then(function serializeDexieResponse(response) {
                    return model.set(response);
                });

        };

    }

};

// apply `table` argument to CRUD method
var _tableWrapper = function (dexieTable) {

    return {
        create:     _create.bind(this, dexieTable),
        find:       _find.bind(this, dexieTable),
        findOne:    _findOne.bind(this, dexieTable),
        update:     _update.bind(this, dexieTable),
        delete:     _delete.bind(this, dexieTable)
    };

};

var _create = function (table, jsonObject, opts) {

    return table.add(jsonObject).then(function (id) {
        return table.get(id);
    });

};

var _find = function (table, opts) {

    return table.toArray();

};

var _findOne = function (table, jsonObject, opts) {

    return _notFoundWrapper(table.get(jsonObject.id), jsonObject);

};

var _update = function (table, jsonObject, opts) {

    return table.put(jsonObject).then(function (id) {
        return table.get(id);
    });

};

var _delete = function (table, jsonObject, opts) {

    return table.delete(jsonObject.id);

};

//////////////////////////////////////////////////////////////////////

// rejects NotFoundError if promise resolved with `undefined` argument
var _notFoundWrapper = function (promise, filter) {
    var deferred = Q.defer();

    filter = filter || {};

    promise
        .then(function (result) {

            if (result === undefined) {
                deferred.reject(new _errors.NotFoundError(
                    "Can't found object with " + JSON.stringify(filter) + " filter"));
            } else {
                deferred.resolve(result);
            }

        })
        .catch(function (err) {

            deferred.reject(err);

        });

    return deferred.promise;
};

var _errors = {

    NotFoundError: function (message) {
        this.name = 'NotFoundError';
        this.message = message;
        this.stack = (new Error()).stack;
    }

};

// static private methods
BackboneSyncDexieAdapter._tableWrapper = _tableWrapper;
BackboneSyncDexieAdapter._create = _create;
BackboneSyncDexieAdapter._find = _find;
BackboneSyncDexieAdapter._findOne = _findOne;
BackboneSyncDexieAdapter._update = _update;
BackboneSyncDexieAdapter._delete = _delete;
BackboneSyncDexieAdapter._errors = _errors;
BackboneSyncDexieAdapter._notFoundWrapper = _notFoundWrapper;

module.exports = BackboneSyncDexieAdapter;