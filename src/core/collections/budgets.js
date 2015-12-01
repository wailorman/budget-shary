var Backbone = require('backbone');
var Budget = require('../models/budget');
var BackboneSyncDexieAdapter = require('../../lib/backbone-dexie-adapter/backbone-dexie-adapter');
var DB = require('../local-db');

var budgetsTable = DB.budgets;

var Budgets = Backbone.Collection.extend({

    model: Budget,

    sync: BackboneSyncDexieAdapter.forCollection(budgetsTable)

});

module.exports = Budgets;