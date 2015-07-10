/**
 * Load plugins
 */
var gulp          = require('gulp');
var less          = require('gulp-less');
var autoprefixer  = require('gulp-autoprefixer');
var minifycss     = require('gulp-minify-css');
var uglify        = require('gulp-uglify');
// var imagemin      = require('gulp-imagemin');
var rename        = require('gulp-rename');
var concat        = require('gulp-concat');
var gulpif        = require('gulp-if');
var browserSync   = require('browser-sync');
var nodemon       = require('gulp-nodemon');
var changed       = require('gulp-changed');
var del           = require('del');
var notify        = require('gulp-notify');
var browserify    = require('browserify');
var source        = require('vinyl-source-stream');
var buffer        = require('vinyl-buffer');
var reactify      = require('reactify');
var globify       = require('require-globify');
var preprocessify = require('preprocessify');
var preprocess    = require('gulp-preprocess');
var babel         = require('gulp-babel');
var gutil         = require('gulp-util');
var runSequence   = require('run-sequence');
var async         = require('async');

/**
 * Load parameters
 */
var argv = require('yargs').argv;

/**
 * Custom configurations
 */

// if livereload not working properly, please increase the delay
var BROWSER_SYNC_RELOAD_DELAY = 50;
var BROWSER_SYNC_SNIPPET_PORT = 7000;

var env;
var isDev;
var isProd;

if (argv.d) {
  isDev = true;
  env = 'development';
}
if (argv.p) {
  isProd = true;
  env = 'production';
}

/**
 * error handler
 */
var handleErrors = function() {
  var args = Array.prototype.slice.call(arguments);

  // Send error to notification center with gulp-notify
  notify.onError({
    title: 'Compile Error',
    message: '<%= error.message %>',
  }).apply(this, args);

  // Keep gulp from hanging on this task
  this.emit('end');
};




















/**
 * clean the build files
 */
gulp.task('clean', function(cb) {
  if (isDev) {
    del(['build/debug/'], cb);
  } else if (isProd) {
    del(['build/release/'], cb);
  }
});

// gulp.task('clean-dev', function(cb) {
//   del(['build/debug/'], cb);
// });

// gulp.task('clean-prod', function(cb) {
//   del(['build/release/'], cb);
// });

























/**
 * compile .less files
 */
gulp.task('styles', function() {
  // global style, material-ui style
  return gulp
    .src(['src/assets/less/main.less', 'src/assets/less/material-ui.less'])
    // .on('end', cb)
    .pipe(gulpif(isDev, changed('build/debug/assets/css')))
    .pipe(less())
    .on('error', handleErrors)
    .pipe(autoprefixer(
      'last 2 version',
      'safari 5',
      'ie 8',
      'ie 9',
      'opera 12.1',
      'ios 6',
      'android 4'
    ))
    .pipe(gulpif(isDev, gulp.dest('build/debug/assets/css')))
    .pipe(gulpif(isProd, minifycss()))
    .pipe(gulpif(isProd, gulp.dest('build/release/assets/css')));
});

// gulp.task('styles-dev', function(cb) {
//   // global style, material-ui style
//   gulp.src(['src/assets/less/main.less', 'src/assets/less/material-ui.less'])
//     .pipe(changed('build/debug/assets/css'))
//     .pipe(less())
//     .on('error', handleErrors)
//     .pipe(autoprefixer(
//       'last 2 version',
//       'safari 5',
//       'ie 8',
//       'ie 9',
//       'opera 12.1',
//       'ios 6',
//       'android 4'
//     ))
//     .pipe(gulp.dest('build/debug/assets/css'))
//     .on('end', cb);
// });

// gulp.task('styles-prod', function(cb) {
//   gulp.src(['src/assets/less/main.less', 'src/assets/less/material-ui.less'])
//     .pipe(less())
//     .on('error', handleErrors)
//     .pipe(autoprefixer(
//       'last 2 version',
//       'safari 5',
//       'ie 8',
//       'ie 9',
//       'opera 12.1',
//       'ios 6',
//       'android 4'
//     ))
//     // .pipe(rename({ suffix: '.min' }))
//     .pipe(minifycss())
//     .pipe(gulp.dest('build/release/assets/css'))
//     .on('end', cb);
// });























/**
 * compile front-end .js files
 */
gulp.task('frontend-scripts', function() {
  return gulp
    .src('src/assets/js/**/*.js')
    // .on('end', cb)
    .pipe(gulpif(isDev, changed('build/debug/assets/js')))
    .pipe(gulpif(isDev, preprocess({
      context: {
        ENV: 'development',
        DEV: true,
      },
    })))
    .pipe(gulpif(isProd, preprocess({
      context: {
        ENV: 'production',
        PROD: true,
      },
    })))
    .pipe(babel())
    .pipe(gulpif(isProd, uglify()))
    .pipe(gulpif(isDev, gulp.dest('build/debug/assets/js')))
    .pipe(gulpif(isProd, gulp.dest('build/release/assets/js')));
});

// gulp.task('frontend-scripts-dev', function(cb) {
//   gulp.src('src/assets/js/**/*.js')
//     .pipe(changed('build/debug/assets/js'))
//     .pipe(preprocess({
//       context: {
//         ENV: 'development',
//         DEV: true,
//       },
//     }))
//     .pipe(babel())
//     .pipe(gulp.dest('build/debug/assets/js'))
//     .on('end', cb);
// });

// gulp.task('frontend-scripts-prod', function(cb) {
//   gulp.src('src/assets/js/**/*.js')
//     .pipe(preprocess({
//       context: {
//         ENV: 'production',
//         PROD: true,
//       },
//     }))
//     .pipe(babel())
//     .pipe(uglify())
//     .pipe(gulp.dest('build/release/assets/js'))
//     .on('end', cb);
// });
















/**
 * compressing images
 * TO-DO
 */
gulp.task('images', function() {
  return gulp
    .src('src/assets/img/**/*')
    // .on('end', cb)
    .pipe(gulpif(isDev, changed('build/debug/assets/img')))
    // .pipe(cache(imagemin({
    //   optimizationLevel: 3,
    //   progressive: true,
    //   interlaced: true,
    // })))
    .pipe(gulpif(isDev, gulp.dest('build/debug/assets/img')))
    .pipe(gulpif(isProd, gulp.dest('build/release/assets/img')));
});

// gulp.task('images-dev', function(cb) {
//   gulp.src('src/assets/img/**/*')
//     .pipe(changed('build/debug/assets/img'))
//     // .pipe(cache(imagemin({
//     //   optimizationLevel: 3,
//     //   progressive: true,
//     //   interlaced: true,
//     // })))
//     .pipe(gulp.dest('build/debug/assets/img'))
//     .on('end', cb);
// });

// gulp.task('images-prod', function(cb) {
//   gulp.src('src/assets/img/**/*')
//     // .pipe(cache(imagemin({
//     //   optimizationLevel: 3,
//     //   progressive: true,
//     //   interlaced: true,
//     // })))
//     .pipe(gulp.dest('build/release/assets/img'))
//     .on('end', cb);
// });




















/**
 * compile backend .js files
 */
gulp.task('backend-scripts', function() {
  return gulp
    .src(['src/**/*.js', '!src/assets/**/*.js'])
    // .on('end', cb)
    .pipe(gulpif(isDev, changed('build/debug')))
    .pipe(preprocess({
      context: {
        ENV: env,
        DEV: isDev,
        PROD: isProd,
      },
    }))
    .pipe(babel())
    .pipe(gulpif(argv.u, uglify()))
    .pipe(gulpif(isDev, gulp.dest('build/debug')))
    .pipe(gulpif(isProd, gulp.dest('build/release')));
});

// gulp.task('backend-scripts-dev', function(cb) {
//   gulp.src(['src/**/*.js', '!src/assets/**/*.js'])
//     .pipe(changed('build/debug'))
//     .pipe(preprocess({
//       context: {
//         ENV: 'development',
//         DEV: true,
//       },
//     }))
//     .pipe(babel())
//     .pipe(gulp.dest('build/debug'))
//     .on('end', cb);
// });

// gulp.task('backend-scripts-prod', function(cb) {
//   gulp.src(['src/**/*.js', '!src/assets/**/*.js'])
//     .pipe(preprocess({
//       context: {
//         ENV: 'production',
//         PROD: true,
//       },
//     }))
//     .pipe(babel())
//     .pipe(gulpif(argv.u, uglify()))
//     .pipe(gulp.dest('build/release'))
//     .on('end', cb);
// });















/**
 * compile backend .jsx view files
 */
gulp.task('backend-views', function() {
  var preprocessifyOption;
  if (isDev) {
    preprocessifyOption = {
      BROWSER_SYNC_SNIPPET_PORT: BROWSER_SYNC_SNIPPET_PORT,
      DEV: true,
    };
  } else if (isProd) {
    preprocessifyOption = {
      PROD: true,
    };
  }
  return browserify({
    debug: isDev,
    entries: './src/assets/js/index.js',
    transform: [
      preprocessify(preprocessifyOption),
      reactify,
      globify,
    ],
    shim: {
      jQuery: 'global:$',
    },
  })
  .bundle()
  .pipe(source('bundle.js'))
  .pipe(buffer())
  // .on('end', cb)
  .pipe(uglify())
  .pipe(gulpif(isDev, gulp.dest('build/debug/assets/js')))
  .pipe(gulpif(isProd, gulp.dest('build/release/assets/js')));
});

// gulp.task('backend-views-dev', function(cb) {
//   async.series([
//     function copyJSX(callback) {
//       gulp.src(['src/views/**/*.jsx'])
//         .pipe(changed('build/debug/views/'))
//         .pipe(gulp.dest('build/debug/views/'))
//         .on('end', callback);
//     },
//     function browserifyPack(callback) {
//       browserify({
//         debug: true,
//         entries: './src/assets/js/index.js',
//         transform: [
//           preprocessify({
//             BROWSER_SYNC_SNIPPET_PORT: BROWSER_SYNC_SNIPPET_PORT,
//             DEV: true,
//           }),
//           reactify,
//           globify,
//         ],
//         shim: {
//           jQuery: 'global:$',
//         },
//       })
//       .bundle()
//       .pipe(source('bundle.js'))
//       .pipe(gulp.dest('build/debug/assets/js'))
//       .on('end', callback);
//     },
//   ], cb);
// });

// gulp.task('backend-views-prod', function(cb) {
//   browserify({
//     debug: false,
//     entries: './src/assets/js/index.js',
//     transform: [
//       preprocessify({
//         PROD: true,
//       }),
//       reactify,
//       globify,
//     ],
//     shim: {
//       jQuery: 'global:$',
//     },
//   })
//   .bundle()
//   .pipe(source('bundle.js'))
//   .pipe(buffer())
//   .pipe(uglify())
//   .pipe(gulp.dest('build/release/assets/js'))
//   .on('end', cb);
// });























/**
 * copy files that does not need to be preprocessed,
 * like nodejs server files, controllers, models, etc.
 */
gulp.task('copy', function() {
  return gulp.src(['src/**/*', '!src/assets/', '!src/**/*.js'])
    .pipe(gulpif(isDev, changed('build/debug')))
    .pipe(gulpif(isDev, gulp.dest('build/debug')))
    .pipe(gulpif(isProd, gulp.dest('build/release')));
});

// gulp.task('copy-dev', function(cb) {
//   gulp.src(['src/**/*', '!src/assets/', '!src/**/*.js'])
//     .pipe(changed('build/debug'))
//     .pipe(gulp.dest('build/debug'))
//     .on('end', cb);
// });

// gulp.task('copy-prod', function(cb) {
//   gulp.src(['src/**/*', '!src/assets/', '!src/**/*.js'])
//     .pipe(gulp.dest('build/release'))
//     .on('end', cb);
// });













/**
 * watch and reprocess files that changed
 */
gulp.task('watch', function(cb) {
  if (isDev) {
    // watch .less files
    gulp.watch('src/assets/less/**/*.less', ['styles']);

    // watch .js files
    gulp.watch('src/assets/js/**/*.js', ['frontend-scripts']);
    gulp.watch(['src/**/*.js', '!src/assets/**/*.js'], ['backend-scripts']);

    // watch .jsx files
    gulp.watch('src/views/**/*.jsx', ['backend-views']);

    // watch image files
    gulp.watch('src/assets/img/**/*', ['images']);

    // watch other files
    gulp.watch([
      'src/**/*',
      '!src/assets/',
      '!src/**/*.js',
      // '!src/views/**/*.jsx',
    ], ['copy']);
  }

  cb();
});

// gulp.task('watch', function(cb) {
//   if (argv.d) {
//     // watch .less files
//     gulp.watch('src/assets/less/**/*.less', ['styles-dev']);

//     // watch .js files
//     gulp.watch('src/assets/js/**/*.js', ['frontend-scripts-dev']);
//     gulp.watch(['src/**/*.js', '!src/assets/**/*.js'], ['backend-scripts-dev']);

//     // watch .jsx files
//     gulp.watch('src/views/**/*.jsx', ['backend-views-dev']);

//     // watch image files
//     gulp.watch('src/assets/img/**/*', ['images-dev']);

//     // watch other files
//     gulp.watch([
//       'src/**/*',
//       '!src/assets/',
//       '!src/**/*.js',
//       '!src/views/**/*.jsx',
//     ], ['copy-dev']);
//   }

//   cb();
// });

/**
 * run the server
 *
 * ref: https://gist.github.com/sogko/b53d33d4f3b40d3b4b2e
 * - this gist shows how to prevent nodemon from showing errors
 *   when starting or restarting app
 */
gulp.task('nodemon', function(cb) {
  if (isDev) {
    var started = false;

    return nodemon({
      script: 'build/debug/app.js',
      // detect .jsx files to reload view files into server
      // then the dom tree will be synchronous with client-side
      ext: 'jsx js',
      ignore: [
        'gulpfile.js',
        'node_modules/**/*',
        'src/**/*',
        'build/debug/assets/js/bundle.js',
        'build/release',
      ],
    })
    .on('start', function() {
      if (!started) {
        cb();
        started = true;
      } else {
        browserSync.reload();
      }
    })
    .on('restart', function() {
      // setTimeout(function reload() {
      //   browserSync.reload();
      // }, BROWSER_SYNC_RELOAD_DELAY);
    });
  } else {
    cb();
  }
});

/**
 * livereload and synchronize the browser operations
 */
gulp.task('browser-sync', function(cb) {
  if (isDev) {
    browserSync.init(null, {
      files: [
        'build/debug/**/*.*',
        // to prevent the server-rendered document tree differentiate with
        // the client-rendered document tree, we have to unwatch view files
        // on both server and client side
        '!build/debug/views/**/*.jsx',
        '!build/debug/assets/js/bundle.js',
      ],
      port: BROWSER_SYNC_SNIPPET_PORT,
      logLevel: 'info',
      injectChanges: true,
      logSnippet: false,
    });
  } else {
    cb();
  }
});

/**
 * Initialize database
 */
gulp.task('init', function(cb) {
  var models = require('./src/models/');

  models(function(err, db) {
    if (err) {
      gutil.log('Cannot connect to database');
      cb(err);
    }

    var willDropTableNames = ['permission', 'group', 'user'];
    var permNames = ['CREATE_USER', 'DELETE_USER', 'LOGIN', 'POST_ARTICLE'];
    var perms = {};
    var groups = {};

    async.series([
      function dropDb(callback) {
        gutil.log('Dropping tables...');

        async.eachSeries(
          willDropTableNames,
          function iterator(tableName, callback) {
            gutil.log('\t' + tableName);

            db.models[tableName].drop(function(err) {
              gutil.log('\t\tFinished');
              callback(err);
            });
          }, function() {
            callback(err);
          }
        );
      },
      function syncDb(callback) {
        gutil.log('Synchronising schemas...');
        db.sync(function(err) {
          gutil.log('\tFinished');
          callback(err);
        });
      },
      function createPermissions(callback) {
        gutil.log('Creating permissions...');
        async.eachSeries(permNames, function iterator(permName, callback) {
          gutil.log('\t' + permName);
          db.models.permission.create({
            name: permName,
          }, function(err, perm) {
            gutil.log('\t\tFinished');
            perms[permName] = perm;
            callback(err);
          });
        }, function() {
          callback(err);
        });
      },
      function createGrops(callback) {
        gutil.log('Creating groups...');
        callback(null);
      },
      function createGroupRoot(callback) {
        // create `root` group
        gutil.log('\troot');
        db.models.group.create({
          name: 'root',
        }, function(err, groupRoot) {
          groupRoot.addPermission([
            perms.CREATE_USER,
            perms.DELETE_USER,
            perms.LOGIN,
            perms.POST_ARTICLE,
          ], function(err) {
            gutil.log('\t\tFinished');
            groups['root'] = groupRoot;
            callback(err);
          });
        });
      },
      function createGroupAdmin(callback) {
        // create `admin` group
        gutil.log('\tadmin');
        db.models.group.create({
          name: 'admin',
        }, function(err, groupAdmin) {
          groupAdmin.addPermission([
            perms.CREATE_USER,
            perms.LOGIN,
            perms.POST_ARTICLE,
          ], function(err) {
            gutil.log('\t\tFinished');
            groups['admin'] = groupAdmin;
            callback(err);
          });
        });
      },
      function createGroupUser(callback) {
        // create `user` group
        gutil.log('\tuser');
        db.models.group.create({
          name: 'user',
        }, function(err, groupUser) {
          groupUser.addPermission([
            perms.LOGIN,
            perms.POST_ARTICLE,
          ], function(err) {
            gutil.log('\t\tFinished');
            groups['user'] = groupUser;
            callback(err);
          });
        });
      },
      function createUsers(callback) {
        gutil.log('Creating users...');
        callback(null);
      },
      function createUserRoot(callback) {
        gutil.log('\troot');

        // create `root` user
        var rootUser = {
          username: 'root',
          password: 'root',
          isVerified: true,
        };

        db.models.user.register(rootUser, function(err, isExist, user) {
          if (isExist) {
            gutil.log('\t\tDoes not create since the user already exists');
          } else {
            user.setGroup(groups.root, function(err) {
              gutil.log('\t\tFinished');
              callback(err);
            });
          }
        });
      },
    ], function done(err, results) {
      cb(err, results);
    });
  });
});

/**
 * default task
 */
gulp.task('default', function() {
  gulp.start('build');
});

/**
 * Development mode
 */
// gulp.task('dev', function(cb) {
//   runSequence(
//     'clean-dev',
//     'styles-dev',
//     'frontend-scripts-dev',
//     'images-dev',
//     'backend-scripts-dev',
//     'backend-views-dev',
//     'copy-dev',
//     'watch',
//     'nodemon',
//     'browser-sync',
//     function() {
//       cb();
//     }
//   );
// });

/**
 * Production mode
 */
// gulp.task('prod', ['clean-prod'], function() {
//   gulp.start(
//     'styles-prod',
//     'frontend-scripts-prod',
//     'images-prod',
//     'backend-scripts-prod',
//     'backend-views-prod',
//     'copy-prod'
//   );
// });

gulp.task('build', function(cb) {
  // gulp.start(
  //   'styles',
  //   'frontend-scripts',
  //   'images',
  //   'backend-scripts',
  //   'backend-views',
  //   'copy',
  //   'watch',
  //   'nodemon',
  //   'browser-sync'
  // );
  runSequence(
    'clean',
    'styles',
    'frontend-scripts',
    'images',
    'backend-scripts',
    'backend-views',
    'copy',
    'watch',
    'nodemon',
    'browser-sync',
    function() {
      cb();
    }
  );
});