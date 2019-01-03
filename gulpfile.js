// Includes
var gulp = require('gulp');

var autoprefixer = require('gulp-autoprefixer');
var handlebars = require('gulp-compile-handlebars');
var fs = require('fs');
var exec = require('child_process').exec;
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
  scripts: './scripts/',
  dynamicPath: false
}

///////////////////////////////////////////
// Compile JSON
///////////////////////////////////////////

gulp.task('jsonlint', function() {
  return gulp.src(path.join(paths.content, '*.json'))
    .pipe(jsonlint())
    .pipe(jsonlint.failOnError())
});

var compileJSON = function() {
  return gulp.src(path.join(paths.content, '*.json'))
    .pipe(merge('content.json'))
    .pipe(gulp.dest(paths.dist))
}
gulp.task('json', gulp.series('jsonlint', compileJSON));


///////////////////////////////////////////
// Compile HTML
///////////////////////////////////////////

var compileHTML = function(done) {
  var contentJSON = JSON.parse(fs.readFileSync(paths.dist + 'content.json', 'utf8'));
  var options = {
    batch: [paths.templates + 'inc'],
    helpers: require(paths.templates + '_helpers.js'),
    partials: {}
  }
  var content = Object.keys(contentJSON).map(function(key) {
     return {id: key, data: contentJSON[key]};
  });

  for (i=0; i<content.length; i++) {
    var section = content[i];

    switch(section['id']) {

      case "homepage" :
        var filename = 'index';
        var destination = '/';
        var data = section['data'];
        data['template'] = 'homepage';
        options['partials']['homepage'] = fs.readFileSync(paths.templates + 'homepage' + '.hbs', 'utf8');

        break;

      default :
        var filename = 'index';
        var destination = section['id'];
        var data = section['data'];
        data['template'] = 'index';
        options['partials']['index'] = fs.readFileSync(paths.templates + 'index' + '.hbs', 'utf8');

        break;
    }

    gulp.src(path.join(paths.templates, 'base.hbs'))
      .pipe(handlebars(data, options))
      .pipe(rename(filename + ".html"))
      .pipe(gulp.dest(paths.public + destination))
  }

  gutil.log(gutil.colors.gray('HTML updated'));
  done();
}
gulp.task('html', gulp.series('json', compileHTML));

///////////////////////////////////////////
// Compile CSS
///////////////////////////////////////////

var compileSASS = function() {
  return gulp.src(path.join(paths.sass, '*.scss'))
    .pipe(sass({outputStyle: 'compressed'})
      .on('error', sass.logError))
    .pipe(autoprefixer())
    .pipe(gulp.dest('./public/css/'))
      .on('end', function(){
        gutil.log(gutil.colors.gray('CSS updated'));
      });
}
gulp.task('sass', compileSASS);

///////////////////////////////////////////
// ￼Compile and minify JS
///////////////////////////////////////////

gulp.task('jslint', function() {
  return gulp.src(path.join(paths.scripts, '*.js'))
    .pipe(jshint())
    .pipe(jshint.reporter('default'))
    .pipe(jshint.reporter('fail'));
});

var compileJS = function() {
  return gulp.src(path.join(paths.scripts, '*.js'))
    .pipe(concat('interface.js'))
    .pipe(uglify())
    .pipe(gulp.dest('./public/js/'))
      .on('end', function(){
        gutil.log(gutil.colors.gray('JS updated…'));
      });
}
gulp.task('js', gulp.series('jslint', compileJS));

///////////////////////////////////////////
// Startup
///////////////////////////////////////////

var startupTasks = gulp.series('sass', 'js', 'html')
gulp.task('startup', startupTasks);

///////////////////////////////////////////
// Watch
///////////////////////////////////////////

var watch = function() {
  gulp.watch(path.join(paths.content, '*.json')).on('change', gulp.series('html'));
  gulp.watch(path.join(paths.sass, '/**/*.scss')).on('change', gulp.series('sass'));
  gulp.watch(path.join(paths.templates, '/**/*.hbs')).on('change', gulp.series('html'));
  gulp.watch(path.join(paths.scripts, '*.js')).on('change', gulp.series('js'));
}
gulp.task('watch', watch);

///////////////////////////////////////////
// Live Server
///////////////////////////////////////////

gulp.task('server', function (done) {
  var server = gls.new('app.js');
  server.start();
  done();
});

///////////////////////////////////////////
// Default
///////////////////////////////////////////

var defaultTasks = gulp.series('startup', 'server', 'watch')

gulp.task('default', defaultTasks);
