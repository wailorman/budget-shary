"use strict";

const Backbone = require('backbone');
const Dispatcher = require('../../dispatcher/dispatcher');
const actionNames = require('../../constants/action-names');

module.exports = Backbone.Model.extend({

    initialize: function () {

        let model = this;

        Dispatcher.register((payload)=> {

            if (payload.model === model) {

                const UPDATE = actionNames.product.update;

                if (payload.eventName == UPDATE) {
                    model.set(payload.attributes);
                }

            }

        });

    },

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