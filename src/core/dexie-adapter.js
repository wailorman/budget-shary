var BackboneSyncDexieAdapter = function (dexieTable) {

    var methodMapper = {
        create: "create",
        read: "findOne",
        update: "update",
        delete: "delete"
    };

    return function (method, model, options) {

        var crudMethod = _tableWrapper(dexieTable)[methodMapper[method]];
        var jsonObj = model.attributes;

        var serializeDexieResponse = function (response) {
            return model.set(response);
        };

        return crudMethod(jsonObj, options)
            .then(serializeDexieResponse);

    };

};

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

    return table.get(jsonObject.id);

};

var _update = function (table, jsonObject, opts) {

    return table.put(jsonObject, jsonObject.id).then(function (id) {
        return table.get(id);
    });

};

var _delete = function (table, jsonObject, opts) {

    return table.delete(jsonObject.id);

};

// static private methods
BackboneSyncDexieAdapter._tableWrapper = _tableWrapper;
BackboneSyncDexieAdapter._create = _create;
BackboneSyncDexieAdapter._find = _find;
BackboneSyncDexieAdapter._findOne = _findOne;
BackboneSyncDexieAdapter._update = _update;
BackboneSyncDexieAdapter._delete = _delete;

module.exports = BackboneSyncDexieAdapter;