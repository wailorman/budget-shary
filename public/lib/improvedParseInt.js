"use strict";

module.exports = function (str) {
    return /^\s*\d+\s*$/.test(str) ? +str : NaN;
};