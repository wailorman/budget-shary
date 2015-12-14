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

    validate: function (attrs) {

        if (attrs.name && typeof attrs.name !== "string")
            return `Invalid name type. Except string instead of ${typeof attrs.name}`;

        if (attrs.price && typeof attrs.price !== "number")
            return `Invalid price type. Except number instead of ${typeof attrs.price}`;

    }

});