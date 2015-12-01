var Backbone = require('backbone');
var DB = require('../local-db');
var DbUtils = require('../local-db-utils');
var BackboneDexieAdapter = require('../../lib/backbone-dexie-adapter/backbone-dexie-adapter');

var personsTable = DB.persons;

module.exports = Backbone.Model.extend({

    defaults: {
        name: '',
        share: 0
    },

    sync: BackboneDexieAdapter.forModel(personsTable)

});