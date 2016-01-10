"use strict";

const Backbone = require('backbone');
const _ = require('lodash');

Backbone.Model.prototype.toJSON = function(options) {

    if (!options) options = {};

    let resultObject = this.attributes;

    if (options.includeCid) {
        if (!this.cid) throw new Error(`Model doesn't have .cid property`);
        _.merge(resultObject, {cid: this.cid});
    }

    return _.clone(resultObject);

};