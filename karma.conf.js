var webpack = require('webpack');
var _ = require('lodash');
var originalTestConfig = require('./webpack.config-mocha');
var karmaWebpackConfig = _.pick(originalTestConfig, ['context', 'module', 'plugins', 'devtool']);

// remove write-file-webpack-plugin
karmaWebpackConfig.plugins = _.take(karmaWebpackConfig.plugins, 1);

module.exports = function (config) {

    config.set({

        frameworks: ['mocha'],
        reporters: ['mocha'],

        plugins: [
            require('karma-webpack'),
            require('karma-sourcemap-loader'),
            require('karma-phantomjs-launcher'),
            require('karma-chrome-launcher'),
            require('karma-mocha-reporter'),
            require('karma-mocha')
        ],

        files: [
            './node_modules/phantomjs-polyfill/bind-polyfill.js',
            './test/requirements/karma.js',
            './public/test/integration/**/*.int.js'
        ],

        exclude: [],

        preprocessors: {
            '../**/*.int.js': ['webpack', 'sourcemap']
        },

        browsers: ['PhantomJS'],

        // Exit the test runner as well when the test suite returns.
        singleRun: false,

        // enable / disable watching file and executing tests whenever any file changes
        autoWatch: true,

        webpack: karmaWebpackConfig,

        webpackServer: {
            noInfo: true //please don't spam the console when running in karma!
        }

    });

};