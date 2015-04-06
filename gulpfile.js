var gulp = require('gulp');
var deploy = require('gulp-gh-pages');
var del = require('del');

/*******************************************************************************
    COPY TO DIST
*******************************************************************************/
var options = {
	cacheDir: '../foo' 
};

var filesToMove = [
				'./**/*.*',
				'!./node_modules/**/',
				'!./gulpfile.js'
        //'./icons/**/*.*',
        //'./src/page_action/**/*.*',
        //'./manifest.json'
    ];
// TODO rewrite for GULP v4
gulp.task('copyto:dist', function () {
  // the base option sets the relative root for the set of files,
  // preserving the folder structure
  gulp.src(filesToMove, {
      base: './'
    })
    .pipe(gulp.dest('./dist'));
});

// Copy all files at the root level (app)
gulp.task('copy', ['clean'], function () {
  return gulp.src([
    './*',
		'!./node_modules/**/'
  ], {
    dot: true
  }).pipe(gulp.dest('dist'));
});

// Clean output directory
gulp.task('clean', del.bind(null, ['.tmp', './dist/**/', '!dist/.git'], {dot: true}));

/**
 * Push build to gh-pages
 */
gulp.task('deploy', function () {
  return gulp.src(['./dist/**/*', '!./node_modules/**/'])
    .pipe(deploy(options))
});
