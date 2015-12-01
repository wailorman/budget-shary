var Backbone = require('backbone');
var DB = require('../local-db');
var DbUtils = require('../local-db-utils');
var BackboneDexieAdapter = require('../../lib/backbone-dexie-adapter/backbone-dexie-adapter');

var budgetsTable = DB.budgets;

module.exports = Backbone.Model.extend({

    defaults: {
        name: ''
    },

    sync: BackboneDexieAdapter.forModel(budgetsTable)

});