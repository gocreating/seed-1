/*!
 * gulp
 * $ npm install gulp-less gulp-autoprefixer gulp-minify-css gulp-jshint gulp-concat gulp-uglify gulp-notify gulp-rename gulp-livereload del --save-dev
 */
 
// Load plugins
var gulp = require('gulp'),
    less = require('gulp-less'),
    autoprefixer = require('gulp-autoprefixer'),
    minifycss = require('gulp-minify-css'),
    jshint = require('gulp-jshint'),
    uglify = require('gulp-uglify'),
    // imagemin = require('gulp-imagemin'),
    rename = require('gulp-rename'),
    concat = require('gulp-concat'),
    notify = require('gulp-notify'),
    // cache = require('gulp-cache'),
    livereload = require('gulp-livereload'),
    del = require('del');
 
// Nodejs
gulp.task('nodejs', function() {
  return gulp.src(['src/**/*', '!src/assets'])
    .pipe(gulp.dest('build/debug'))
    .pipe(livereload())
    /*.pipe(notify({ message: 'Nodejs task complete' }))*/;
});

// Styles
gulp.task('styles', function() {
  return gulp.src('src/assets/less/main.less')
    .pipe(less())
    .pipe(autoprefixer('last 2 version', 'safari 5', 'ie 8', 'ie 9', 'opera 12.1', 'ios 6', 'android 4'))
    .pipe(gulp.dest('build/debug/assets/css'))
    .pipe(rename({ suffix: '.min' }))
    .pipe(minifycss())
    .pipe(gulp.dest('build/debug/assets/css'))
    .pipe(livereload())
    /*.pipe(notify({ message: 'Styles task complete' }))*/;
});
 
// Scripts
gulp.task('scripts', function() {
  return gulp.src('src/assets/js/**/*.js')
    // .pipe(jshint('.jshintrc'))
    // .pipe(jshint.reporter('default'))
    // .pipe(concat('main.js'))
    .pipe(gulp.dest('build/debug/assets/js'))
    .pipe(rename({ suffix: '.min' }))
    .pipe(uglify())
    .pipe(gulp.dest('build/debug/assets/js'))
    .pipe(livereload())
    /*.pipe(notify({ message: 'Scripts task complete' }))*/;
});
 
// Images
gulp.task('images', function() {
  return gulp.src('src/assets/img/**/*')
    // .pipe(cache(imagemin({ optimizationLevel: 3, progressive: true, interlaced: true })))
    .pipe(gulp.dest('build/debug/assets/img'))
    .pipe(livereload())
    /*.pipe(notify({ message: 'Images task complete' }))*/;
});
 
// Clean
gulp.task('clean', function(cb) {
    // del(['build/debug/assets/css', 'build/debug/assets/js', 'build/debug/assets/img'], cb);
    del(['build/debug/'], cb);
});
 
// Watch
gulp.task('watch', function() {
  // Create LiveReload server
  livereload.listen();

  // Watch .scss files
  gulp.watch('src/assets/less/**/*.less', ['styles']);
 
  // Watch .js files
  gulp.watch('src/assets/js/**/*.js', ['scripts']);
 
  // Watch image files
  gulp.watch('src/assets/img/**/*', ['images']);
 
  // Watch other files
  gulp.watch(['src/**/*', '!src/assets/**/*'], ['nodejs']);

  // Watch any files in dist/, reload on change
  // gulp.watch(['build/debug/**']).on('change', livereload.changed);
});

// Synchronize database
gulp.task('syncdb', function() {
  var orm = require("orm");
  orm.connect("sqlite://db.sqlite", function (err, db) {
    if (err) {
      console.log('Cannot connect to database');
      throw err;
    }
    db.sync(function() {
    });
  });
});

// Default task
gulp.task('default', ['clean'], function() {
    gulp.start('nodejs', 'styles', 'scripts', 'images', 'watch');
});