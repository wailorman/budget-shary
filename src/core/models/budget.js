"use strict";

const Backbone = require('backbone');
const validator = require('backbone-validator');
const PersonsCollection = require('../collections/persons');
const Dispatcher = require('../../dispatcher/dispatcher');
const actionNames = require('../../constants/action-names');


let Budget = Backbone.Model.extend({

    initialize() {

        let model = this;

        Dispatcher.register((payload)=> {

            // if payload.model is not specified, change
            // will apply to all budget models

            // But if model was passed, we have to check it
            if (payload.model && payload.model !== model) return undefined;

            const UPDATE = actionNames.budget.update;

            if (payload.eventName == UPDATE) {

                model.set(payload.attributes);

            }


        });

    },

    defaults: {
        name: '',
        persons: new PersonsCollection()
    },

    validate: validator.create({
        name: {type: 'string'}
    })

});

module.exports = Budget;