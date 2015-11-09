var Backbone = require('backbone');
var DB = require('../local-db');
var DbUtils = require('../local-db-utils');

var personsTable = DB.persons;

module.exports = Backbone.Model.extend({

    defaults: {
        name: '',
        share: 0
    },

    sync: function (method, model, options) {

        return DbUtils.backboneMiddleware(personsTable, method, model.attributes)
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