var Backbone = require('backbone');
var DB = require('../local-db');
var DbUtils = require('../local-db-utils');

var eventsTable = DB.persons;

module.exports = Backbone.Model.extend({

    defaults: {
        name: ''
    },

    sync: function (method, model, options) {

        return DbUtils.backboneMiddleware(eventsTable, method, model.attributes)
            .then(function (newModelAttributes) {
                model.set(newModelAttributes);
                return model
            });

    }

});