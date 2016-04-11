global.sinon = require('sinon');
global.expect = require('chai').expect;

try {
    global.window = window ? window : {};
} catch (e) {
    global.window = {};
}

require('./universal');