var gulp = require('gulp');
var concat = require('gulp-concat');
var jshint = require('gulp-jshint');
var stylish = require('jshint-stylish');
var uglify = require('gulp-uglify');
var jscs = require('gulp-jscs');
var benchmark = require('gulp-jscs');
var size = require('gulp-size');
var beautify = require('gulp-beautify');
var replace = require('gulp-replace-task');
var insert = require('gulp-insert');
var watch = require('gulp-watch');

var sources = [
  'src/libs/*.js',
  'src/libs/**/*.js',
  'src/prefix.js',
  'src/Shaders/*.js',
  'src/API/*.js',
  'src/Watchers/*.js',
  'src/whitestorm.js',
  'src/Objects/*.js',
  'src/Ground/*.js',
  'src/Fog/*.js',
  'src/Light/*.js',
  'src/Wagner/*.js',
  'src/Controls/*.js',
  'src/GUI/*.js'
]

var codes = [
  'src/prefix.js',
  'src/Shaders/*.js',
  'src/API/*.js',
  'src/Watchers/*.js',
  'src/whitestorm.js',
  'src/Objects/*.js',
  'src/Ground/*.js',
  'src/Fog/*.js',
  'src/Light/*.js',
  'src/Wagner/*.js',
  'src/Controls/*.js',
  'src/GUI/*.js'
]

var re1='(\\/)';	// Any Single Character 1
var re2='(.)';	// Any Single Character 2
var re3='(.)';	// Any Single Character 3
var re4='(\\s+)';	// White Space 1
var re5='(.)';	// Any Single Character 4
var re6='(\\s+)';	// White Space 2
var re7='(.)';	// Any Single Character 5
var re8='(\\s+)';	// White Space 3
var re9='((?:[a-z][a-z]+))';	// Word 1
var re10='(\\s+)';	// White Space 4
var re11='((?:[a-z][a-z]+))';	// Word 2
var re12='(.)';	// Any Single Character 6
var re13='(\\s+)';	// White Space 5
var re14='(\\d+)';	// Integer Number 1
var re15='([-+]\\d+)';	// Integer Number 1
var re16='(\\s+)';	// White Space 6
var re17='(.)';	// Any Single Character 7
var re18='(\\s+)';	// White Space 7
var re19='((?:[a-z][a-z]+))';	// Word 3
var re20='(.)';	// Any Single Character 8
var re21='(\\s+)';	// White Space 8
var re22='((?:http|https)(?::\\/{2}[\\w]+)(?:[\\/|\\.]?)(?:[^\\s"]*))';	// HTTP URL 1
var re23='(\\s+)';	// White Space 9
var re24='(.)';	// Any Single Character 9
var re25='(\\s+)';	// White Space 10
var re26='((?:[a-z][a-z]+))';	// Word 4
var re27='(.)';	// Any Single Character 10
var re28='(\\s+)';	// White Space 11
var re29='([\\w-+]+(?:\\.[\\w-+]+)*@(?:[\\w-]+\\.)+[a-zA-Z]{2,7})';	// Email Address 1
var re30='(\\s+)';	// White Space 12
var re31='(.)';	// Any Single Character 11
var re32='(.)';	// Any Single Character 12

var author_comment = "/**\n" +
" * © Alexander Buzin, 2014-2015\n" +
" * Site: http://alexbuzin.me/\n" +
" * Email: alexbuzin88@gmail.com\n" +
"*/\n" +
"\n";

var lib_includes = "var THREE = require('three');\n" +
"var CANNON = require('cannon');\n" + 
"var jQuery = require('jquery');";

gulp.task('build', function() {

  gulp.src(sources)
    .pipe(replace({
      patterns: [
        {
          match: new RegExp(re1+re2+re3+re4+re5+re6+re7+re8+re9+re10+re11+re12+re13+re14+re15+re16+re17+re18+re19+re20+re21+re22+re23+re24+re25+re26+re27+re28+re29+re30+re31+re32,["i"]),
          replacement: ''
        }
      ]
    }))
    .pipe(concat('whitestorm.js'))
    .pipe(insert.prepend(author_comment))
    .pipe(beautify())
    //.pipe(size({title: 'original'}))
    .pipe(gulp.dest('./build/'));
  gulp.src(sources)
    .pipe(concat("whitestorm.test.js"))
    .pipe(insert.prepend(lib_includes))
    .pipe(uglify())
    .pipe(insert.prepend(author_comment))
    .pipe(gulp.dest("./build/"));
  gulp.src(sources)
    .pipe(concat('whitestorm.min.js'))
    .pipe(uglify())
    .pipe(insert.prepend(author_comment))
    //.pipe(size({title: 'mini'}))
    .pipe(gulp.dest('./build/'));
});

gulp.task('test', function() {

  gulp.src(sources)
    .pipe(concat('whitestorm.js'))
    .pipe(gulp.dest('./build/'));
});

gulp.task('watch', function() {
  gulp.watch(sources, ['test']);

  watch('src/**/*.js', {
    events: ['add']
  }, function(file) {
    gulp.src(file.path).pipe(insert.prepend(author_comment))
      .pipe(gulp.dest(file.dirname));
  });
});

gulp.task('clean', function() {
  gulp.src(codes).pipe(jscs({fix: true})).pipe(jscs.reporter())
        .pipe(jscs.reporter('fail'));
})
