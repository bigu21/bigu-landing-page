var gulp          = require('gulp');
var gutil         = require('gulp-util');
var less          = require('gulp-less');
var autoprefixer  = require('gulp-autoprefixer');
var minifyHTML    = require('gulp-minify-html');
var jade          = require('gulp-jade');
var concat        = require('gulp-concat');
var path          = require('path');
var uglifyJS      = require('gulp-uglify');
var livereload    = require('gulp-livereload');
var tinylr        = require('tiny-lr');
var server        = tinylr();
var express       = require('express');
var app           = express();

gulp.task('jade', function() {

  gulp.src('./*.jade')
    .pipe(jade({
      pretty: true
    }))
    .pipe(gulp.dest('./dist/'))
    .pipe(livereload(server));
});

gulp.task('uglifyJS', function() {

  gulp.src('./js/*.js')
  .pipe(concat('app.js'))
  .pipe(uglifyJS())
  .pipe(gulp.dest('./dist/js'))
  .pipe(livereload(server));
});

gulp.task('less', function() {
  gulp.src('./stylesheets/*.less')
  .pipe(less({ compress: true }).on('error', gutil.log))
  .pipe(concat('style.min.css'))
  .pipe(autoprefixer()) 
  .pipe(gulp.dest('./dist/stylesheets/'))
  .pipe(livereload(server));
});

gulp.task('minifyHTML', function() {

});

gulp.task('express', function() {
  app.use(express.static(path.resolve('./dist')));
  app.listen(1337);
  gutil.log('Listening on port: 1337');
});


gulp.task('watch', function() {
  server.listen(35729, function(err) {
    if(err)
      return  console.log(err);

    gulp.watch('./*.jade', ['jade']);
    gulp.watch('./stylesheets/*.less', ['less']);
    gulp.watch('./js/*.js', ['uglifyJS']);
  });
});


gulp.task('default', ['jade', 'less', 'uglifyJS', 'minifyHTML', 'express', 'watch']); 
