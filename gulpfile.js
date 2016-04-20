var gulp = require('gulp');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var beautify = require('gulp-beautify');
var replace = require('gulp-replace-task');
var insert = require('gulp-insert');
var watch = require('gulp-watch');
var babel = require("gulp-babel");

var sources = [
    'src/libs/*.js',
    'src/libs/**/*.js',
    'src/Polyfill.js',
    'src/Prefix.js',
    'src/Core/*.js',
    'src/API/*.js',
    'src/Watchers/*.js',
    'src/Plugins/*.js',
    'src/Objects/*.js',
    'src/Shapes/*.js',
    'src/Lights/*.js',
    'src/Controls/*.js',
    'src/Components/*.js'
]

var sources_test = [
    'src/libs/*.js',
    'src/libs/**/*.js',
    'src/Prefix.js',
    'src/Core/*.js',
    'src/API/*.js',
    'src/Watchers/*.js',
    'src/Plugins/*.js',
    'src/Objects/*.js',
    'src/Shapes/*.js',
    'src/Lights/*.js',
    'src/Controls/*.js',
    'src/Components/*.js'
]

var author_comment = "/**\n" +
    " * © Alexander Buzin, 2014-2015\n" +
    " * Site: http://alexbuzin.me/\n" +
    " * Email: alexbuzin88@gmail.com\n" +
    "*/\n" +
    "\n";

var lib_includes = [
    "var THREE = require('three');",
    "var jQuery = require('jquery');"
].join("\n");


/* =========================== GULP COMMANDS =========================== */

gulp.task('build', function() {

    // Original.
    gulp.src(sources)
        .pipe(replace({
            patterns: [
                {
                    match: new RegExp(
                        '(\\/)(.)(.)(\\s+)(.)(\\s+)(.)(\\s+)' +
                        '((?:[a-z][a-z]+))(\\s+)((?:[a-z][a-z]+))(.)' +
                        '(\\s+)(\\d+)([-+]\\d+)(\\s+)(.)(\\s+)' +
                        '((?:[a-z][a-z]+))(.)(\\s+)' +
                        '((?:http|https)(?::\\/{2}[\\w]+)(?:[\\/|\\.]?)(?:[^\\s"]*))' +
                        '(\\s+)(.)(\\s+)((?:[a-z][a-z]+))(.)(\\s+)' +
                        '([\\w-+]+(?:\\.[\\w-+]+)*@(?:[\\w-]+\\.)+[a-zA-Z]{2,7})' +
                        '(\\s+)(.)(.)'
                        ,["i"]),
                    replacement: ''
                }
            ]
        }))
        .pipe(concat('whitestorm.js'))
        .pipe(babel({
            presets: ['es2015']
        }))
        .pipe(beautify())
        .pipe(insert.prepend(author_comment))
        .pipe(gulp.dest('./build/'));

    // For testing.
    gulp.src(sources_test)
        .pipe(concat("whitestorm.test.js"))
        .pipe(babel({
            presets: ['es2015']
        }))
        .pipe(insert.prepend(lib_includes))
        .pipe(uglify())
        .pipe(insert.prepend(author_comment))
        .pipe(gulp.dest("./build/"));

    // Minified.
    gulp.src(sources)
        .pipe(concat('whitestorm.min.js'))
        .pipe(babel({
            presets: ['es2015']
        }))
        .pipe(uglify())
        .pipe(insert.prepend(author_comment))
        .pipe(gulp.dest('./build/'));

});