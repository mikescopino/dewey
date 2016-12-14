// Includes
var gulp = require('gulp');

var autoprefixer = require('gulp-autoprefixer');
var handlebars = require('gulp-compile-handlebars');
var fs = require('fs');
var gls = require('gulp-live-server');
var gutil = require('gulp-util');
var jsonlint = require("gulp-jsonlint");
var merge = require('gulp-merge-json');
var path = require('path');
var rename = require('gulp-rename');
var sass = require('gulp-sass');
var uglify = require('gulp-uglify');
var concat = require('gulp-concat');
var jshint = require('gulp-jshint');

// Site paths
var paths = {
  root: "/",
  content: './src/',
  templates: './templates/',
  sass: './sass/',
  dist: './dist/',
  public: './public/',
  scripts: './scripts/'
}

///////////////////////////////////////////
// ￼Validate JSON sources
///////////////////////////////////////////

gulp.task('jsonlint', function() {
  return gulp.src(path.join(paths.content, '*.json'))
    .pipe(jsonlint())
    .pipe(jsonlint.failOnError())
});

gulp.task('jslint', function() {
  return gulp.src(path.join(paths.scripts, '*.js'))
    .pipe(jshint())
    .pipe(jshint.reporter('default'))
    .pipe(jshint.reporter('fail'));
});

///////////////////////////////////////////
// ￼Generate HTML from Handlebars templates
///////////////////////////////////////////

gulp.task('handlebars', ['jsonlint'],  function() {
  gutil.log(gutil.colors.gray('HTML is being generated…'));

  gulp.src(path.join(paths.content, '*.json'))
    .pipe(merge('content.json'))
    .pipe(gulp.dest(paths.dist))
    .on('end', function() {
      // Read merged content data asynchronously
      var content = JSON.parse(fs.readFileSync(paths.dist + 'content.json', 'utf8'));
      var options = {
        batch: [paths.templates + 'inc'],
        helpers: require(paths.templates + '_helpers.js'),
        partials: {}
      }

      for (var section in content) {

        // A. Homepage
        if (section == "homepage") {
          var filename = 'index';
          var data = content[section];
          data['home'] = true;
          options['partials']['home'] =
          fs.readFileSync(paths.templates + 'homepage.hbs', 'utf8');

          gulp.src(path.join(paths.templates, 'base.hbs'))
            .pipe(handlebars(data, options))
            .pipe(rename(filename + ".html"))
            .pipe(gulp.dest(paths.public));
        }
      }
    });
});


///////////////////////////////////////////
// Pipe SASS to CSS
///////////////////////////////////////////

gulp.task('sass-startup', ['handlebars'], function() {
  return gulp.src(path.join(paths.sass, '*.scss'))
    .pipe(sass({outputStyle: 'compressed'})
      .on('error', sass.logError))
    .pipe(autoprefixer())
    .pipe(gulp.dest('./public/css/'))
      .on('end', function(){
        gutil.log(gutil.colors.gray('CSS generated'));
      });
});

gulp.task('sass', function() {
  return gulp.src(path.join(paths.sass, '*.scss'))
    .pipe(sass({outputStyle: 'compressed'})
      .on('error', sass.logError))
    .pipe(autoprefixer())
    .pipe(gulp.dest('./public/css/'))
      .on('end', function(){
        gutil.log(gutil.colors.gray('CSS updated'));
      });
});

///////////////////////////////////////////
// ￼Compile and minify JS
///////////////////////////////////////////

gulp.task('js-startup', ['handlebars', 'sass-startup', 'jslint'], function() {
  return gulp.src(path.join(paths.scripts, '*.js'))
    .pipe(concat('interface.js'))
    .pipe(uglify())
    .pipe(gulp.dest('./public/js/'))
      .on('end', function() {
        gutil.log(gutil.colors.gray('JS minified'));
      });
});

gulp.task('js', ['jslint'], function() {
  return gulp.src(path.join(paths.scripts, '*.js'))
    .pipe(concat('interface.js'))
    .pipe(uglify())
    .pipe(gulp.dest('./public/js/'))
      .on('end', function() {
        gutil.log(gutil.colors.gray('JS minified'));
      });
});

///////////////////////////////////////////
// Live Server
///////////////////////////////////////////

gulp.task('server', ['handlebars', 'sass-startup', 'js-startup'], function() {
  var server = gls.new('app.js');
  server.start();

  // Watch for manual reload
  gulp.watch(path.join(paths.content, '*.json'), ['handlebars']);
  gulp.watch(path.join(paths.sass, '/**/*.scss'), ['sass']);
  gulp.watch(path.join(paths.templates, '/**/*.hbs'), ['handlebars']);
  gulp.watch(path.join(paths.scripts, '*.js'), ['js']);
});


///////////////////////////////////////////
// Default
///////////////////////////////////////////

gulp.task('default', ['server']);
