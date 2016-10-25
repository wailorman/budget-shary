var gulp = require('gulp'),
    zip = require('gulp-zip'),
    packageInfo = require('./package.json');

const zipName = `budget-shary-v${packageInfo.version}.zip`;

gulp.task('zip', function () {

    return gulp.src('dist/**/*')
        .pipe(zip(zipName))
        .pipe(gulp.dest('dist/'));

});

gulp.task('default', ['webpack']);
