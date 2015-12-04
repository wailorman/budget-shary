const NODE_ENV = process.env.NODE_ENV == 'production' ? 'production' : 'development';
var webpack = require('webpack');

var webpackConfig = {
    entry: './src/main.js',
    output: {
        path: __dirname + '/dist',
        filename: './bundle.js'
    },

    module: {

        loaders: [
            {
                test: /\.js$/,
                exclude: /(node_modules)/,
                loader: 'babel',
                query: {
                    presets: ['es2015', 'react'],
                    plugins: ['transform-runtime']
                }
            },
            { test: /\.less$/, loader: 'style!css!less' },
            { test: /\.(ttf|woff|woff2|eot|svg|png|jpg)$/, loader: 'url?name=[path][name].[ext]&limit=4096' }
        ]

    },

    plugins: []
};

if (NODE_ENV == 'development') {

    webpackConfig.devtool = 'cheap-inline-module-source-map';

}

if (NODE_ENV == 'production') {
    webpackConfig.plugins.push(
        new webpack.optimize.UglifyJsPlugin()
    );

    webpackConfig.devtool = null;
}

module.exports = webpackConfig;