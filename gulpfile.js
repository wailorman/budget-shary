var gulp = require('gulp'),
    uglify = require('gulp-uglify'),
    plumber = require('gulp-plumber'),
    less = require('gulp-less'),
    concatCss = require('gulp-concat-css'),
    minifyCss = require('gulp-minify-css'),
    copy = require('gulp-copy'),
    clean = require('gulp-rimraf'),
    concat = require('gulp-concat'),
    rename = require('gulp-rename'),
    source = require('vinyl-source-stream'),
    gutil = require('gulp-util'),

    browserify = require('browserify'),
    babelify = require('babelify'),
    watchify = require('watchify'),

    // live reload
    connect = require('connect'),
    connectLiveReload = require('connect-livereload'),
    opn = require('opn'),
    livereload = require('gulp-livereload');

///////////////  scripts  ///////////////////////

var bundlePaths = {
        src: {
            js: [
                'src/**/*.js'
            ],
            jsEntry: 'src/main.js'
        },
        dest: 'dist/'
    },

    browserifyOpts = {
        entries: [bundlePaths.src.jsEntry],
        debug: true,
        cache: {},
        packageCache: {}
    },

    babelifyOpts = {
        presets: ['react', 'es2015']
    };

function bundle(bundler) {

    //noinspection JSUnresolvedFunction
    return bundler.bundle()
        .pipe(source('bundle.js'))
        .pipe(gulp.dest(bundlePaths.dest));

}

gulp.task('watchify', function () {

    //noinspection JSUnresolvedFunction
    var bundler = watchify(browserify(browserifyOpts)).transform(babelify, babelifyOpts);

    // fire livereload update event after
    bundle(bundler).pipe(livereload());

});

/////////////   /scripts   ///////////////



gulp.task('livereload-server', function () {
    livereload({start: true});
});

gulp.task('watch', ['livereload-server', 'watchify'], function () {

    gulp.watch('src/**/*.js', ['watchify']);

});

gulp.task('default', ['scripts']);
