var gulp = require('gulp');
var stylus = require('gulp-stylus');
var minifyHTML = require('gulp-minify-html');
var jade = require('gulp-jade');
var concat = require('gulp-concat');
var uglifyJS = require('gulp-uglify');

gulp.task('jade', function() {

  gulp.src('./**/*.jade')
    .pipe(jade({
      pretty: true
    }))
    .pipe(gulp.dest('./dist/'));
});

gulp.task('uglifyJS', function() {

  gulp.src('./js/*.js')
  .pipe(uglifyJS())
  .pipe(gulp.dest('./dist/js'));
});

gulp.task('stylus', function() {
  gulp.src('./stylesheets/*.styl')
  .pipe(stylus({
    compress: true
  }))
  .pipe(concat('all.min.css'))
  .pipe(gulp.dest('./dist/stylesheets/'));
});

gulp.task('minifyHTML', function() {

});


gulp.task('default', function() {

});
