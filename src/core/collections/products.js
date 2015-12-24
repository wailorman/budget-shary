"use strict";

const Backbone = require('backbone');
const Product = require('../models/product');
const _ = require('lodash');
const Dispatcher = require('../../dispatcher/dispatcher');
const actionNames = require('../../constants/action-names');

let ProductsCollection = Backbone.Collection.extend({

    initialize: function (models, opts) {

        let collection = this;

        Dispatcher.register((payload)=> {

            const CREATE = actionNames.product.create;
            const DELETE = actionNames.product.delete;

            if (payload.collection === collection) {

                if (payload.eventName == CREATE) {
                    collection.add(new Product());
                }

            }

            if (payload.eventName == DELETE) {
                collection.remove(payload.model);
            }

        });

    },

    model: Product,

    totalPrice: function () {

        let totalPrice = 0;

        _.forEach(this.models, (product)=> {

            totalPrice += product.get('price');

        });

        return totalPrice;

    }

});

module.exports = ProductsCollection;