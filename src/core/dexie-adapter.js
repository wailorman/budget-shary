var BackboneSyncDexieAdapter = function (dexieTable) {

    return {
        create: _create.bind(this, dexieTable),
        read: _read.bind(this, dexieTable),
        update: _update.bind(this, dexieTable),
        delete: _delete.bind(this, dexieTable)
    };

};

var _create = function (table, jsonObject, opts) {

    return table.add(jsonObject).then(function (id) {
        return table.get(id);
    });

};

var _read = function (table, jsonObject, opts) {

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
BackboneSyncDexieAdapter._create = _create;
BackboneSyncDexieAdapter._read = _read;
BackboneSyncDexieAdapter._update = _update;
BackboneSyncDexieAdapter._delete = _delete;

module.exports = BackboneSyncDexieAdapter;