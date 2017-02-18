// require('babel-core/register')(require('../../package.json').babel);
// require('babel-polyfill');
//
// require('source-map-support').install({
//     environment: 'node'
// });

const glob = typeof global == 'undefined' ? window : global;

Object.assign(glob, {

    sinonSandbox: require('../helpers/sinon-sandbox'),

    expect: require('../requirements/providing/chai-expect'),
    assert: require('../requirements/providing/chai-assert'),

    React: require('react'),
    ReactDOM: require('react-dom'),
    _: require('lodash'),
    Q: require('q'),

    Immutable: require('immutable'),

    store: require('../requirements/local-storage')

});