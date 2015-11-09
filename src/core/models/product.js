var Backbone = require('backbone');
var DB = require('../local-db');
var DbUtils = require('../local-db-utils');

var productsTable = DB.products;

module.exports = Backbone.Model.extend({

    defaults: {
        name: '',
        price: 0
    },

    sync: function (method, model, options) {

        return DbUtils.backboneMiddleware(productsTable, method, model.attributes)
            .then(function (newModelAttributes) {
                model.set(newModelAttributes);
                return model
            });

    }

});