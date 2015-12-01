var Backbone = require('backbone');
var DB = require('../local-db');
var DbUtils = require('../local-db-utils');
var BackboneDexieAdapter = require('../../lib/backbone-dexie-adapter/backbone-dexie-adapter');

var productsTable = DB.products;

module.exports = Backbone.Model.extend({

    defaults: {
        name: '',
        price: 0
    },

    sync: BackboneDexieAdapter.forModel(productsTable)

});