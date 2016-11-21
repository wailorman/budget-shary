var gulp = require('gulp'),
    zip = require('gulp-zip'),
    ftp  = require('vinyl-ftp'),
    gutil = require('gulp-util'),
    URL = require('url-parse'),
    exec = require('child_process').exec,
    packageInfo = require('./package.json');

const zipName = `budget-shary-v${packageInfo.version}.zip`;

gulp.task('zip', function () {

    return gulp.src('dist/**/*')
        .pipe(zip(zipName))
        .pipe(gulp.dest('dist/'));

});

gulp.task('deploy', function () {

    const connectionString = process.env.FTP_CONNECTION || '';

    const connObj = new URL(connectionString);

    const connectionConfig = {
        host: connObj.hostname,
        user: connObj.username,
        password: connObj.password,
        log: gutil.log,

        parallel: 10
    };

    const conn = ftp.create(connectionConfig);

    const files = [
        'dist/**/*.js',
        'dist/**/*.css',
        'dist/**/*.map',
        'dist/**/*.html',
    ];

    exec('git describe --long --abbrev=10 --tags', (err, out)=> {

        const buildHash = out.slice(0, -1);

        const gulpPipe = gulp.src(files, {base: './dist/', buffer: false});

        gulpPipe.pipe(conn.dest('budget-shary/builds/' + buildHash));

    });

});

gulp.task('default', ['webpack']);
