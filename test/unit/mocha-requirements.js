require('babel-core/register')(require('../../package.json').babel);
require('babel-polyfill');

require('source-map-support').install({
    environment: 'node'
});

global.sinon = require('sinon');
global.sinonSandbox = require('../helpers/sinon-sandbox');

global.expect = require('../requirements/providing/chai-expect');
global.assert = require('../requirements/providing/chai-assert');

global.React = require('react');
global.ReactDOM = require('react-dom');
global._ = require('lodash');
global.Q = require('q');

global.store = require('../requirements/local-storage');