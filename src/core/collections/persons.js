var Backbone = require('backbone');
var Person = require('../models/person');
var BackboneSyncDexieAdapter = require('../../lib/backbone-dexie-adapter/backbone-dexie-adapter');
var DB = require('../local-db');

var personsTable = DB.persons;

var Persons = Backbone.Collection.extend({

    model: Person,

    sync: BackboneSyncDexieAdapter.forCollection(personsTable)

});

module.exports = Persons;