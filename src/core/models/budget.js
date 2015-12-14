"use strict";

const Backbone = require('backbone');
const validator = require('backbone-validator');
const PersonsCollection = require('../collections/persons');


let Budget = Backbone.Model.extend({

    defaults: {
        name: ''
    },

    validate: validator.create({
        name: {type: 'string'}
    })

});

module.exports = Budget;