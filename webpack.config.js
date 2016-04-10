const NODE_ENV = process.env.NODE_ENV == 'production' ? 'production' : 'development';
var webpack = require('webpack');

var webpackConfig = {
    entry: './public/src/main.js',
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
            {
                test: /\.json$/,
                loader: 'json'
            },
            { test: /\.less$/, loader: 'style!css!less' },
            { test: /\.(ttf|woff|woff2|eot|svg|png|jpg)$/, loader: 'url?name=[path][name].[ext]&limit=4096' }
        ]

    },

    plugins: [
        new webpack.ProvidePlugin({
            'React': 'react',
            'ReactDOM': 'react-dom',
            '_': 'lodash'
        })
    ]
};

if (NODE_ENV == 'development') {

    webpackConfig.devtool = 'eval';

}

if (NODE_ENV == 'production') {
    webpackConfig.plugins.push(
        new webpack.optimize.UglifyJsPlugin()
    );

    webpackConfig.devtool = null;
}

module.exports = webpackConfig;