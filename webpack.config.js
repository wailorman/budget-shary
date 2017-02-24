const NODE_ENV = !process.env.NODE_ENV ? 'development' : process.env.NODE_ENV;

var webpack = require('webpack');
var WriteFilePlugin = require('write-file-webpack-plugin');
// var WebpackBuildNotifierPlugin = require('webpack-build-notifier');
var ExtractTextPlugin = require("extract-text-webpack-plugin");

var babelConfig = require('./package1.json').babel;

var webpackConfig = {

    // target: 'node',

    node: {
        fs: 'empty',
        module: 'empty',
        child_process: 'empty',
        // process: 'empty'
    },

    externals: {
        'react/lib/ReactContext': true,
        'react/lib/ExecutionEnvironment': true,
        'react/addons': true
    },

    entry: {
        'bundle': './src/index.js'
    },

    output: {
        path: __dirname + '/dist/js',
        filename: '[name].build.js',

        devtoolModuleFilenameTemplate: "[absolute-resource-path]",
        devtoolFallbackModuleFilenameTemplate: "[absolute-resource-path]?[hash]",
    },

    module: {

        loaders: [
            {
                test: /\.js$/,
                exclude: /(node_modules)/,
                loader: 'babel',
                query: babelConfig
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
            'store': __dirname + '/test/requirements/local-storage.js',
            'Immutable': 'immutable'
        }),
        new WriteFilePlugin({ log: false }),
        new ExtractTextPlugin("[name].css"),

        // for webstorm
        new webpack.SourceMapDevToolPlugin(
            '[file].map', null,
            "[absolute-resource-path]", "[absolute-resource-path]"
        )
    ],

    devServer: {
        outputPath: __dirname + '/dist/js',
        host: '0.0.0.0',

        // It suppress error shown in console, so it has to be set to false.
        quiet: false,
        // It suppress everything except error, so it has to be set to false as well
        // to see success build.
        noInfo: false,
        stats: {
            // Config for minimal console.log mess.
            assets: true,
            colors: true,
            version: false,
            hash: false,
            timings: false,
            chunks: false,
            chunkModules: false,
            children: false
        },
    }
};

if (NODE_ENV == 'development' || NODE_ENV == 'test') {

    webpackConfig.devtool = 'eval';

}

if (NODE_ENV == 'production') {
    webpackConfig.plugins.push(
        new webpack.optimize.UglifyJsPlugin()
    );

    webpackConfig.plugins.push(new webpack.DefinePlugin({ 'process.env.NODE_ENV': JSON.stringify(NODE_ENV) }));

    webpackConfig.devtool = 'source-map';
}

module.exports = webpackConfig;