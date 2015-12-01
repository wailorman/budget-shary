var Backbone = require('backbone');
var Product = require('../models/product');
var BackboneSyncDexieAdapter = require('../../lib/backbone-dexie-adapter/backbone-dexie-adapter');
var DB = require('../local-db');

var productsTable = DB.products;

var Products = Backbone.Collection.extend({

    model: Product,

    sync: BackboneSyncDexieAdapter.forCollection(productsTable)

});

module.exports = Products;