const originalConfig = require('./webpack.config');
const webpack = require('webpack');
const WriteFilePlugin = require('write-file-webpack-plugin');
var WebpackBuildNotifierPlugin = require('webpack-build-notifier');

var webpackConfig = {

    //target: 'node',
    //externals: [nodeExternals()],
    externals: {
        'react/lib/ReactContext': true,
        'react/lib/ExecutionEnvironment': true,
        'react/addons': true
    },
    context: originalConfig.context,
    node: originalConfig.node,
    entry: {

        "unit-client": `mocha!${__dirname}/public/test/unit/index`,

        "integration-client-dev": `mocha!${__dirname}/public/test/integration/index`

    },
    output: {
        path: __dirname + '/dist/test/',
        filename: '[name].build.js',

        // for webstorm
        devtoolModuleFilenameTemplate: '[absolute-resource-path]',
        devtoolFallbackModuleFilenameTemplate: '[absolute-resource-path]?[hash]'
    },

    module: {

        loaders: [
            originalConfig.module.loaders[0],
            originalConfig.module.loaders[1],

            {test: /\.css$/, loader: 'null'}
        ]

    },

    plugins: [
        new webpack.ProvidePlugin({
            '$': 'jquery/dist/jquery.min',
            '_': 'lodash',
            'Q': 'q',
            'logger': __dirname + '/public/lib/logger',

            'React': 'react',
            'ReactDOM': 'react-dom',
            'TestUtils': 'react-addons-test-utils',

            'expect': __dirname + '/test/requirements/providing/chai-expect.js',
            'assert': __dirname + '/test/requirements/providing/chai-assert.js',
            'enzyme': 'enzyme',
            'sinon': 'imports?define=>false,require=>false!sinon/pkg/sinon',
            'sinonSandbox': __dirname + '/test/helpers/sinon-sandbox.js',
            'given': __dirname + '/test/requirements/providing/given-mocha-testdata.js'
        }),
        new WriteFilePlugin(),
        new WebpackBuildNotifierPlugin({successSound: false})
    ],

    devtool: 'eval',

    devServer: {
        outputPath: __dirname + '/dist/test/'
    }

};

module.exports = webpackConfig;