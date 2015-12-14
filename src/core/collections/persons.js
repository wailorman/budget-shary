"use strict";

const Backbone = require('backbone');
const Person = require('../models/person');


let PersonsCollection = Backbone.Collection.extend({

    model: Person

});

module.exports = PersonsCollection;