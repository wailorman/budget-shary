"use strict";

const Backbone = require('backbone');
const Person = require('../models/person');
const Dispatcher = require('../../dispatcher/dispatcher');
const actionNames = require('../../constants/action-names');

let PersonsCollection = Backbone.Collection.extend({

    initialize: function (models, opts) {

        let collection = this;

        Dispatcher.register((payload)=> {

            const CREATE = actionNames.person.create;
            const DELETE = actionNames.person.delete;

            if (payload.collection === collection) {

                if (payload.eventName == CREATE) {
                    collection.add(new Person());
                }

            }

            if (payload.eventName == DELETE) {
                collection.remove(payload.model);
            }

        });

    },

    model: Person

});

module.exports = PersonsCollection;