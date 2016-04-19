'use strict';
const gulp = require('gulp');
const jscs = require('gulp-jscs');
const jshint = require('gulp-jshint');

const paths = {
  scripts: ['**/*.js', '!coverage/**/*.js', '!node_modules/**/*.js']
};
gulp.task('jshint', function() {
  return gulp.src(paths.scripts)
    .pipe(jshint())
    .pipe(jshint.reporter('default'))
    .pipe(jshint.reporter('fail'));
});

gulp.task('jscs', function() {
  return gulp.src(paths.scripts)
    .pipe(jscs())
    .pipe(jscs.reporter());
});

gulp.task('default', ['jshint', 'jscs']);
