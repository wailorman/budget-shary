var gulp = require('gulp'),
    browserify = require('gulp-browserify'),
    uglify = require('gulp-uglify'),
    plumber = require('gulp-plumber'),
    less = require('gulp-less'),
    concatCss = require('gulp-concat-css'),
    minifyCss = require('gulp-minify-css'),
    copy = require('gulp-copy'),
    clean = require('gulp-rimraf'),

    // live reload
    connect = require('connect'),
    connectLiveReload = require('connect-livereload'),
    opn = require('opn'),
    gulpLiveReload = require('gulp-livereload');

var DEV_MODE = false;

gulp.task('scripts', function () {
    gulp.src('src/**/*.js')
        .pipe(plumber())
        .pipe(browserify({transform: 'reactify', insertGlobals: true, debug: true}))
        //.pipe(uglify())
        .pipe(gulp.dest('dist'))
        .pipe(gulpLiveReload());
});


gulp.task('styles', function () {

    gulp.src('src/**/*.less')
        .pipe(plumber())
        .pipe(less({
            compress: true,
            paths: ['./']
        }))
        .pipe(concatCss('css/bundle.css'))
        .pipe(gulp.dest('dist'))
        .pipe(gulpLiveReload());

});

gulp.task('templates', function () {

    gulp.src('src/**/*.html')
        .pipe(plumber())
        .pipe(copy('dist/templates', {prefix: 10}));

});

gulp.task('clean', function () {

    var filesToClean = [ './src/**/*.css' ];

    gulp.src(filesToClean, {read: false})
        .pipe(clean());

});

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

gulp.task('open', function () {
    opn('http://localhost:8080/dist');
});

gulp.task('connect', function () {

    //noinspection JSUnresolvedFunction
    connect()
        .use(connectLiveReload())
        .use(connect.static('./'))
        .listen(8080);

});

gulp.task('serve', ['watch', 'connect', 'open']);

gulp.task('set-dev-mode', function () {

    DEV_MODE = true;

});

gulp.task('watch', function () {

    gulpLiveReload.listen();

    var gulpReloadFunction = function (file) {
        
        return gulp.src(file.path)
            .pipe(gulpLiveReload());

    };

    //gulp.watch('dist/**/*', gulpReloadFunction);

    gulp.watch('src/js/**/*.js', ['scripts']);
    gulp.watch('src/templates/**/*.less', ['styles']);
    gulp.watch('src/templates/**/*.html', gulpReloadFunction);

});

gulp.task('default', ['scripts']);
