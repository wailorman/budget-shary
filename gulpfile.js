var gulp = require('gulp'),
    plumber = require('gulp-plumber'),
    less = require('gulp-less'),
    concatCss = require('gulp-concat-css'),
    source = require('vinyl-source-stream'),
    copy = require('gulp-copy'),

    browserify = require('browserify'),
    babelify = require('babelify'),
    watchify = require('watchify'),

    // live reload
    livereload = require('gulp-livereload');

///////////////  scripts  ///////////////////////

var bundlePaths = {
        src: {
            js: [
                'src/**/*.js'
            ],
            css: [
                'src/components/**/*.less'
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


/////////////   styles  ///////////////

gulp.task('styles', function () {

    return gulp.src(bundlePaths.src.css)
        .pipe(plumber())
        .pipe(less({
            paths: ['.']
        }))
        .pipe(concatCss('bundle.css'))
        .pipe(gulp.dest(bundlePaths.dest))
        .pipe(livereload())
        .on('error', function (error) {
            console.error('' + error);
        });

});

gulp.task('copy-glyphicons', function () {

    return gulp.src('node_modules/bootstrap/fonts/**/*')
        .pipe(copy(bundlePaths.dest + '/fonts', {prefix: 3}));

});

/////////////   /styles  ///////////////


gulp.task('livereload-server', function () {
    livereload({start: true});
});

gulp.task('watch', ['livereload-server', 'watchify', 'styles'], function () {

    gulp.watch('src/**/*.js', ['watchify']);
    gulp.watch('src/**/*.less', ['styles']);

});

gulp.task('default', ['scripts']);
