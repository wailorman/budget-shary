"use strict";

const Backbone = require('backbone');
const ProductsCollection = require('../collections/products');
const Dispatcher = require('../../dispatcher/dispatcher');
const actionNames = require('../../constants/action-names');

module.exports = Backbone.Model.extend({

    initialize: function () {

        let model = this;

        Dispatcher.register((payload)=> {

            if (payload.model === model) {

                const UPDATE = actionNames.person.update;

                if (payload.eventName == UPDATE) {
                    model.set(payload.attributes);
                }

            }

        });

    },

    defaults: {
        name: '',
        share: 0
    },

    validate: function (attrs) {

        if (attrs.name && typeof attrs.name !== "string")
            return `Invalid name type. Except string instead of ${typeof attrs.name}`;

        if (attrs.share && typeof attrs.share !== "number")
            return `Invalid share type. Except number instead of ${typeof attrs.share}`;

        if (attrs.products && !(attrs.products instanceof ProductsCollection))
            return `Products could be only ProductsCollection, not ${attrs.products.prototype}`;

        if (!(attrs.share >= 0 && attrs.share <= 1))
            return `${attrs.share} is not valid share. Share should satisfy 0 >= x >= 1 condition`;

    }

});