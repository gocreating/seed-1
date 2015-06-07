/**
 * Load plugins
 */
var gulp         = require('gulp'),
    less         = require('gulp-less'),
    autoprefixer = require('gulp-autoprefixer'),
    minifycss    = require('gulp-minify-css'),
    jshint       = require('gulp-jshint'),
    uglify       = require('gulp-uglify'),
    // imagemin  = require('gulp-imagemin'),
    rename       = require('gulp-rename'),
    concat       = require('gulp-concat'),
    browserSync  = require('browser-sync'),
    nodemon      = require('gulp-nodemon'),
    changed      = require('gulp-changed'),
    del          = require('del'),
    notify       = require("gulp-notify"),
    browserify   = require('browserify'),
    source       = require('vinyl-source-stream'),
    buffer       = require('vinyl-buffer'),
    reactify     = require('reactify');
    preprocess   = require('gulp-preprocess');
    babel        = require('gulp-babel');

/**
 * error handler
 */
var handleErrors = function() {
  var args = Array.prototype.slice.call(arguments);

  // Send error to notification center with gulp-notify
  notify.onError({
    title: "Compile Error",
    message: "<%= error.message %>"
  }).apply(this, args);

  // Keep gulp from hanging on this task
  this.emit('end');
};

/**
 * clean the build files
 */
gulp.task('clean-dev', function(cb) {
    del(['build/debug/'], cb);
});

gulp.task('clean', function(cb) {
    del(['build/release/'], cb);
});

/**
 * compile .less files
 */
gulp.task('styles-dev', function() {
  return gulp.src('src/assets/less/main.less')
    .pipe(changed('build/debug/assets/css'))
    .pipe(less())
    .on('error', handleErrors)
    .pipe(autoprefixer('last 2 version', 'safari 5', 'ie 8', 'ie 9', 'opera 12.1', 'ios 6', 'android 4'))
    .pipe(gulp.dest('build/debug/assets/css'));
});

gulp.task('styles', function() {
  return gulp.src('src/assets/less/main.less')
    .pipe(less())
    .on('error', handleErrors)
    .pipe(autoprefixer('last 2 version', 'safari 5', 'ie 8', 'ie 9', 'opera 12.1', 'ios 6', 'android 4'))
    .pipe(rename({ suffix: '.min' }))
    .pipe(minifycss())
    .pipe(gulp.dest('build/release/assets/css'));
});

gulp.task('material-ui-dev', function() {
  gulp.src('src/assets/less/material-ui.less')
    .pipe(less())
    .on('error', handleErrors)
    .pipe(autoprefixer('last 2 version', 'safari 5', 'ie 8', 'ie 9', 'opera 12.1', 'ios 6', 'android 4'))
    .pipe(gulp.dest('build/debug/assets/css'));

  browserify({
    debug : true,
    entries: './src/assets/js/app.jsx',
    transform: [reactify]
  })
  .bundle()
  .pipe(source('app.js'))
   //do all processing here.
   //like uglification and so on.
  .pipe(gulp.dest('build/debug/assets/js'));
});

gulp.task('material-ui', function() {
  gulp.src('src/assets/less/material-ui.less')
    .pipe(less())
    .on('error', handleErrors)
    .pipe(autoprefixer('last 2 version', 'safari 5', 'ie 8', 'ie 9', 'opera 12.1', 'ios 6', 'android 4'))
    .pipe(rename({ suffix: '.min' }))
    .pipe(minifycss())
    .pipe(gulp.dest('build/release/assets/css'));

  browserify({
    debug : true,
    entries: './src/assets/js/app.jsx',
    transform: [reactify]
  })
  .bundle()
  .pipe(source('app.js'))
  .pipe(buffer())
   //do all processing here.
   //like uglification and so on.
  .pipe(uglify())
  .pipe(gulp.dest('build/release/assets/js'));
});
 
/**
 * minify front-end .js files
 */
gulp.task('scripts-dev', function() {
  return gulp.src('src/assets/js/**/*.js')
    .pipe(babel())
    .pipe(changed('build/debug/assets/js'))
    // .pipe(jshint('.jshintrc'))
    // .pipe(jshint.reporter('default'))
    // .pipe(concat('main.js'))
    .pipe(gulp.dest('build/debug/assets/js'));
});

gulp.task('scripts', function() {
  return gulp.src('src/assets/js/**/*.js')
    // .pipe(jshint('.jshintrc'))
    // .pipe(jshint.reporter('default'))
    // .pipe(concat('main.js'))
    .pipe(babel())
    .pipe(rename({ suffix: '.min' }))
    .pipe(uglify())
    .pipe(gulp.dest('build/release/assets/js'));
});

/**
 * compressing images
 */
gulp.task('images-dev', function() {
  return gulp.src('src/assets/img/**/*')
    .pipe(changed('build/debug/assets/img'))
    // .pipe(cache(imagemin({ optimizationLevel: 3, progressive: true, interlaced: true })))
    .pipe(gulp.dest('build/debug/assets/img'));
});
 
 gulp.task('images', function() {
  return gulp.src('src/assets/img/**/*')
    // .pipe(cache(imagemin({ optimizationLevel: 3, progressive: true, interlaced: true })))
    .pipe(gulp.dest('build/release/assets/img'));
});
/**
 * copy files that does not need to be preprocessed,
 * like nodejs server files, controllers, models, etc.
 */

gulp.task('nodejs-dev', function() {
  return gulp.src(['src/**/*.js', '!src/assets/**/*.js'])
    .pipe(babel())
    .pipe(changed('build/debug'))
    .pipe(gulp.dest('build/debug'));
});

gulp.task('nodejs', function() {
  return gulp.src(['src/**/*.js', '!src/assets/**/*.js'])
    .pipe(babel())
    .pipe(gulp.dest('build/release'));
});

gulp.task('copy-dev', function() {
  return gulp.src(['src/**/*', '!src/assets/', '!src/**/*.js'])
    //.pipe(preprocess({context: { DEV: true}}))
    .pipe(changed('build/debug'))
    .pipe(gulp.dest('build/debug'));
});

gulp.task('copy', function() {
  return gulp.src(['src/**/*', '!src/assets/', '!src/**/*.js'])
    //.pipe(preprocess({context: { PROD: true }}))
    .pipe(gulp.dest('build/release'));
});

 
/**
 * watch and reprocess files that changed
 */
gulp.task('watch', function() {
  // watch .less files
  gulp.watch('src/assets/less/**/*.less', ['styles']);
 
  // watch .js/.jsx files
  gulp.watch('src/assets/js/**/*.js', ['scripts']);
  // gulp.watch('src/assets/js/**/*.jsx', ['material-ui']);
 
  // watch image files
  gulp.watch('src/assets/img/**/*', ['images']);
 
  // watch other files
  gulp.watch(['src/**/*', '!src/assets/**/*'], ['copy-dev']);
});

/**
 * run the server
 */
gulp.task('nodemon', ['copy-dev'], function (cb) {
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
    proxy: 'localhost:5000',
    files: ['build/debug/**/*.*'],
    port: 7000,
  });
});

/**
 * synchronize database
 */
gulp.task('syncdb', function() {
  var models = require('./src/models/');
  models(function (err, db) {
    if (err) return gulp.src('').pipe(notify('[Sync Fail] Cannot connect to database'));
    db.sync(function() {    
      // add dummy data here
      db.models.group.create({
        name: 'default user'
      }, function(err, group) {

      });

      db.models.group.create({
        name: 'vip user'
      }, function(err, group) {

      });
    });
  });
});

/**
 * default task
 */
gulp.task('default', function() {
  gulp.start('dev');
});

/**
 * Development/Debug mode
 */
gulp.task('dev', ['clean-dev'], function() {
  gulp.start('styles-dev', /*'material-ui',*/ 'scripts-dev', 'images-dev', 'nodejs-dev', 'watch', 'browser-sync');
});

/**
 * Deployment/Production mode
 */
gulp.task('prod', ['clean'], function() {
  gulp.start('styles', /*'material-ui',*/ 'scripts', 'images', 'nodejs', 'copy');
  //gulp.src('').pipe(notify('Production mode is currently not supported'));
});