var gulp = require('gulp');
var browserify = require('gulp-browserify');
var sourcemaps = require('gulp-sourcemaps');


gulp.task('scripts', function () {
	return gulp.src('src/app.js')
			.pipe(sourcemaps.init({loadMaps: true}))
			.pipe(browserify({transform: 'reactify', insertGlobals: true, debug: true}))
   			.pipe(sourcemaps.write('./'))
    		.pipe(gulp.dest('dist'));
});

gulp.task('default', ['scripts']);