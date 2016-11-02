if (typeof window == 'undefined'){
    global.localStorage = require('localStorage');
}

var store = require('store');
module.exports = store;