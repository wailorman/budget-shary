var backboneMiddleware = function (table, method, modelAttributes) {

    switch (method) {
        case "create":
            return _backboneMiddleware.create(table, modelAttributes);
        case "read":
            return _backboneMiddleware.read(table, modelAttributes);
        case "update":
            return _backboneMiddleware.update(table, modelAttributes);
        case "delete":
            return _backboneMiddleware.delete(table, modelAttributes);
        default:
            throw new Error('Method `' + method + '` is not defined');

    }

};

var _backboneMiddleware = {

    create: function (table, modelAttributes) {

        return table.add(modelAttributes).then(function (id) {
            return table.get(id);
        });

    },

    read: function (table, modelAttributes) {

        return table.get(modelAttributes.id);

    },

    update: function (table, modelAttributes) {

        return table.put(modelAttributes, modelAttributes.id).then(function (id) {
            return table.get(id);
        });

    },

    delete: function (table, modelAttributes) {

        return table.delete(modelAttributes.id);

    }

};


module.exports.backboneMiddleware = backboneMiddleware;
module.exports._backboneMiddleware = _backboneMiddleware;