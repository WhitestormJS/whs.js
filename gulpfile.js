var gulp = require('gulp');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var beautify = require('gulp-beautify');
var replace = require('gulp-replace-task');
var insert = require('gulp-insert');
var watch = require('gulp-watch');
var sourcemaps = require("gulp-sourcemaps");
var babel = require("gulp-babel");

var sources = [
    'src/libs/*.js',
    'src/libs/**/*.js',
    'src/Polyfill.js',
    'src/Prefix.js',
    'src/Shaders/*.js',
    'src/API/*.js',
    'src/Watchers/*.js',
    'src/Plugins/*.js',
    'src/Core.js',
    'src/Objects/*.js',
    'src/Shapes/*.js',
    'src/Ground/*.js',
    'src/Fog/*.js',
    'src/Light/*.js',
    'src/Wagner/*.js',
    'src/Controls/*.js',
    'src/GUI/*.js',
    'src/Skybox/*.js'
]

var sources_test = [
    'src/libs/*.js',
    'src/libs/**/*.js',
    'src/Prefix.js',
    'src/Shaders/*.js',
    'src/API/*.js',
    'src/Watchers/*.js',
    'src/Plugins/*.js',
    'src/Core.js',
    'src/Objects/*.js',
    'src/Shapes/*.js',
    'src/Ground/*.js',
    'src/Fog/*.js',
    'src/Light/*.js',
    'src/Wagner/*.js',
    'src/Controls/*.js',
    'src/GUI/*.js',
    'src/Skybox/*.js'
]

var codes = [
    'src/Prefix.js',
    'src/Shaders/*.js',
    'src/API/*.js',
    'src/Watchers/*.js',
    'src/Core.js',
    'src/Objects/*.js',
    'src/Shapes/*.js',
    'src/Ground/*.js',
    'src/Fog/*.js',
    'src/Light/*.js',
    'src/Wagner/*.js',
    'src/Controls/*.js',
    'src/GUI/*.js',
    'src/Skybox/*.js'
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

// Build command.
gulp.task('build', function() {

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
        .pipe(sourcemaps.init())
        .pipe(concat('whitestorm.js'))
        .pipe(babel({
            presets: ['es2015']
        }))
        .pipe(beautify())
        .pipe(insert.prepend(author_comment))
        .pipe(gulp.dest('./build/'));

    gulp.src(sources_test)
        .pipe(concat("whitestorm.test.js"))
        .pipe(babel({
            presets: ['es2015']
        }))
        .pipe(insert.prepend(lib_includes))
        .pipe(uglify())
        .pipe(insert.prepend(author_comment))
        .pipe(gulp.dest("./build/"));

    gulp.src(sources)
        .pipe(concat('whitestorm.min.js'))
        .pipe(babel({
            presets: ['es2015']
        }))
        .pipe(uglify())
        .pipe(insert.prepend(author_comment))
        .pipe(gulp.dest('./build/'));

});

// Test command.
gulp.task('test', function() {

    gulp.src(sources)
        .pipe(concat('whitestorm.js'))
        .pipe(babel({
            presets: ['es2015']
        }))
        .pipe(gulp.dest('./build/'));

});

// Watch command.
gulp.task('watch', function() {

    gulp.watch(sources, ['test']);

    watch('src/**/*.js', {
        events: ['add']
    }, function(file) {

    gulp.src(file.path).pipe(insert.prepend(author_comment))
        .pipe(gulp.dest(file.dirname));
            
    });

});
