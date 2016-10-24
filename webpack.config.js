const NODE_ENV = !process.env.NODE_ENV ? 'development' : process.env.NODE_ENV;

console.log(`------- NODE_ENV = '${NODE_ENV}'`);

var webpack = require('webpack');
var WriteFilePlugin = require('write-file-webpack-plugin');
var WebpackBuildNotifierPlugin = require('webpack-build-notifier');
var ExtractTextPlugin = require("extract-text-webpack-plugin");

var webpackConfig = {

    // target: 'node',

    node: {
        // fs: 'empty',
        // child_process: 'empty',
        // process: 'empty'
    },

    externals: {
        'react/lib/ReactContext': true,
        'react/lib/ExecutionEnvironment': true,
        'react/addons': true
    },

    entry: NODE_ENV == 'production' ? {

        'bundle': './src/index.js'

    } : NODE_ENV == 'test' ? {

        "unit": `${__dirname}/test/unit/index`

    } : { // NODE_ENV == 'development' =>

        'bundle': './src/index.js',
        "unit-browser": `mocha!${__dirname}/test/unit/index-browser`,
        "unit": `${__dirname}/test/unit/index`,
        "integration-dev": `mocha!${__dirname}/test/integration/index`

    },

    output: {
        path: __dirname + '/dist/js',
        filename: '[name].build.js',

        // for webstorm
        devtoolModuleFilenameTemplate: '[absolute-resource-path]',
        devtoolFallbackModuleFilenameTemplate: '[absolute-resource-path]?[hash]'
    },

    module: {

        loaders: [
            {
                test: /\.js$/,
                exclude: /(node_modules)/,
                loader: 'babel',
                query: {
                    retainLines: true,
                    cacheDirectory: true,
                    presets: ['es2015', 'react'],
                    plugins: ['transform-runtime', "transform-object-rest-spread"]
                }
            },
            {
                test: /\.json$/,
                loader: 'json'
            },
            {
                test: /\.css/,
                loader: ExtractTextPlugin.extract("style-loader", "css-loader")
            },
            {
                test: /\.(ttf|woff|woff2|eot|svg|png|jpg)$/,
                loader: 'url?name=[path][name].[ext]&limit=4096'
            }
        ]

    },

    plugins: [
        new webpack.ProvidePlugin({
            'React': 'react',
            'ReactDOM': 'react-dom',
            '_': 'lodash',
            'Q': 'q',

            '$': 'jquery/dist/jquery.min',

            'TestUtils': 'react-addons-test-utils',

            'expect': __dirname + '/test/requirements/providing/chai-expect.js',
            'assert': __dirname + '/test/requirements/providing/chai-assert.js',
            'enzyme': 'enzyme',
            'sinon': 'imports?define=>false,require=>false!sinon/pkg/sinon',
            'sinonSandbox': __dirname + '/test/helpers/sinon-sandbox.js',
            'given': __dirname + '/test/requirements/providing/given-mocha-testdata.js'
        }),
        new WriteFilePlugin(),
        new ExtractTextPlugin("[name].css")
    ],

    devServer: {
        outputPath: __dirname + '/dist/js'
    }
};

if (NODE_ENV == 'development' || NODE_ENV == 'test') {

    webpackConfig.devtool = 'eval';
    webpackConfig.plugins.push(new WebpackBuildNotifierPlugin({successSound: false}));

}

if (NODE_ENV == 'production') {
    webpackConfig.plugins.push(
        new webpack.optimize.UglifyJsPlugin()
    );

    webpackConfig.plugins.push(new webpack.DefinePlugin({ 'process.env.NODE_ENV': JSON.stringify(NODE_ENV) }));

    webpackConfig.devtool = 'source-map';
}

module.exports = webpackConfig;