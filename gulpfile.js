var gulp = require('gulp'),
    plumber = require('gulp-plumber'),
    less = require('gulp-less'),
    concatCss = require('gulp-concat-css'),
    source = require('vinyl-source-stream'),
    copy = require('gulp-copy'),
    watch = require('gulp-watch'),
    clean = require('gulp-rimraf'),

    browserify = require('browserify'),
    babelify = require('babelify'),
    watchify = require('watchify'),

    // live reload
    livereload = require('gulp-livereload'),

// webpack
    gutil = require('gulp-util'),
    webpack = require('webpack'),
    browserSync = require('browser-sync').create();

var webpackConfig = require('./webpack.config');
var NODE_ENV = 'production';

/////////////    webpack    ///////////////

gulp.task('set-dev-mode', function () {
    NODE_ENV = 'development';
});

gulp.task("webpack", ['copy-index-html'], function (callback) {

    if (NODE_ENV == 'development')
        webpackConfig.watch = true;

    // run webpack
    webpack(webpackConfig, function (err, stats) {
        if (err) throw new gutil.PluginError("webpack", err);
        gutil.log("[webpack]", stats.toString({
            // output options
        }));
        //callback();
    });
});

gulp.task('copy-index-html', function () {

    return gulp.src('./src/index.html')
        .pipe(copy('./dist/', {prefix: 10}));

});

gulp.task('browser-sync', ['copy-index-html'], function () {
    browserSync.init({
        server: {
            baseDir: "./dist/"
        }
    });

    watch('./dist/**/*', function () {
        browserSync.reload();
    });
    gulp.watch('./src/index.html', ['copy-index-html']);
});

gulp.task('serve', ['set-dev-mode', 'webpack', 'browser-sync']);

/////////////    /webpack    ///////////////

gulp.task('default', ['webpack']);
