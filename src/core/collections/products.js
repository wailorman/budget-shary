"use strict";

const Backbone = require('backbone');
const Product = require('../models/product');
const _ = require('lodash');

let ProductsCollection = Backbone.Collection.extend({

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