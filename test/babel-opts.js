require('babel-register')({
    presets: ['es2015'],
    sourceMaps: true,
    //experimental: true,
    retainLines: true
});

global.indexedDB = require('fake-indexeddb');