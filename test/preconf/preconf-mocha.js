var babelConf = require('../../package.json').babel;

require("babel-register")({
    "retainLines": true,
    "presets": [
        "es2015",
        "react"
    ],
    "sourceMaps": "inline",
    "only": [
        "src/components/**/*.js"
    ]
});

require.extensions['.less'] = function (module, filename) {
    return undefined;
};

global.sinon = require('sinon');
global.indexedDB = require('fake-indexeddb');
require('./preconf-universal');
