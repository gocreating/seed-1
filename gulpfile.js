/**
 * Load plugins
 */
var gulp = require('gulp'),
    less = require('gulp-less'),
    autoprefixer = require('gulp-autoprefixer'),
    minifycss = require('gulp-minify-css'),
    jshint = require('gulp-jshint'),
    uglify = require('gulp-uglify'),
    // imagemin = require('gulp-imagemin'),
    rename = require('gulp-rename'),
    concat = require('gulp-concat'),
    browserSync = require('browser-sync'),
    nodemon = require('gulp-nodemon'),
    changed = require('gulp-changed'),
    del = require('del');

/**
 * clean the build files
 */
gulp.task('clean', function(cb) {
    del(['build/debug/'], cb);
});

/**
 * compile .less files
 */
gulp.task('styles', function() {
  return gulp.src('src/assets/less/main.less')
    .pipe(changed('build/debug/assets/css'))
    .pipe(less())
    .pipe(autoprefixer('last 2 version', 'safari 5', 'ie 8', 'ie 9', 'opera 12.1', 'ios 6', 'android 4'))
    .pipe(gulp.dest('build/debug/assets/css'))
    .pipe(rename({ suffix: '.min' }))
    .pipe(minifycss())
    .pipe(gulp.dest('build/debug/assets/css'));
});
 
/**
 * minify front-end .js files
 */
gulp.task('scripts', function() {
  return gulp.src('src/assets/js/**/*.js')
    .pipe(changed('build/debug/assets/js'))
    // .pipe(jshint('.jshintrc'))
    // .pipe(jshint.reporter('default'))
    // .pipe(concat('main.js'))
    .pipe(gulp.dest('build/debug/assets/js'))
    .pipe(rename({ suffix: '.min' }))
    .pipe(uglify())
    .pipe(gulp.dest('build/debug/assets/js'));
});
 
/**
 * compressing images
 */
gulp.task('images', function() {
  return gulp.src('src/assets/img/**/*')
    .pipe(changed('build/debug/assets/img'))
    // .pipe(cache(imagemin({ optimizationLevel: 3, progressive: true, interlaced: true })))
    .pipe(gulp.dest('build/debug/assets/img'));
});
 
/**
 * copy files that does not need to be preprocessed,
 * like nodejs server files, controllers, models, etc.
 */
gulp.task('copy', function() {
  return gulp.src(['src/**/*', '!src/assets/'])
    .pipe(changed('build/debug'))
    .pipe(gulp.dest('build/debug'));
});
 
/**
 * watch and reprocess files that changed
 */
gulp.task('watch', function() {
  // watch .less files
  gulp.watch('src/assets/less/**/*.less', ['styles']);
 
  // watch .js files
  gulp.watch('src/assets/js/**/*.js', ['scripts']);
 
  // watch image files
  gulp.watch('src/assets/img/**/*', ['images']);
 
  // watch other files
  gulp.watch(['src/**/*', '!src/assets/**/*'], ['copy']);
});


/**
 * run the server
 */
gulp.task('nodemon', function (cb) {
  return nodemon({
    script: 'build/debug/app.js'
  }).on('start', function () {
    cb();
  });
});

/**
 * livereload and synchronize the browser operations
 */
gulp.task('browser-sync', ['nodemon'], function() {
  browserSync.init(null, {
    proxy: 'localhost:4000',
    files: ['build/debug/**/*.*'],
    port: 7000,
  });
});

/**
 * synchronize database
 * however, this task is still not working
 * please ignore it
 */
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

/**
 * default task
 */
gulp.task('default', ['clean'], function() {
    gulp.start('copy', 'styles', 'scripts', 'images', 'watch', 'browser-sync');
});