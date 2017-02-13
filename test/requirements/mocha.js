require('./universal');

const glob = typeof global == 'undefined' ? window : global;

_.extend(glob, {

    sinon: require('sinon')

});