module.exports = function (config) {

    config.set({

        frameworks: ['mocha', 'sinon'],
        reporters: ['progress', 'mocha', 'coverage'],

        plugins: [
            require('karma-webpack'),
            require('karma-sourcemap-loader'),
            require('karma-phantomjs-launcher'),
            require('karma-chrome-launcher'),
            require('karma-mocha-reporter'),
            require('karma-coverage'),
            require('karma-mocha'),
            require('karma-sinon')
        ],

        files: [
            './test/requirements/karma.js',
            // './test/integration/**/*.int.js',
            './src/**/*.unit.js'
        ],

        exclude: [],

        preprocessors: {
            // './**/*.int.js': ['webpack', 'sourcemap'],
            './test/requirements/karma.js': ['webpack', 'sourcemap'],
            './src/**/*.unit.js': ['webpack', 'sourcemap'],
            './src/**/!(unit).js': ['coverage']
        },

        browsers: ['Chrome'],

        // Exit the test runner as well when the test suite returns.
        singleRun: false,

        // enable / disable watching file and executing tests whenever any file changes
        autoWatch: true,

        webpack: require('./webpack.config'),

        webpackServer: {
            noInfo: true //please don't spam the console when running in karma!
        },

        coverageReporter: {
            type : 'html',
            dir : 'coverage'
        }

    });

};