var Backbone = require('backbone');
var DB = require('../local-db');
var DbUtils = require('../local-db-utils');

var budgetsTable = DB.persons;

module.exports = Backbone.Model.extend({

    defaults: {
        name: ''
    },

    sync: function (method, model, options) {

        return DbUtils.backboneMiddleware(budgetsTable, method, model.attributes)
            .then(function (newModelAttributes) {
                options.success(newModelAttributes);
                return model
            })
            .catch(function (err) {
                options.error(err);
                return err;
            });

    }

});