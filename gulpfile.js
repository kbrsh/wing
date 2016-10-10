'use strict';

var gulp = require('gulp');
var pkg = require('./package.json');
var minifyCSS = require('gulp-minify-css');
var comment = '\/*\r\n* Wing ' + pkg.version + '\r\n* Copyright 2016, Kabir Shah\r\n* http:\/\/usewing.ml\/\r\n* Free to use under the MIT license.\r\n* https:\/\/kingpixil.github.io\/license\r\n*\/\r\n';
var $ = require('gulp-load-plugins')();

gulp.task('build', function () {
  return gulp.src(['./src/top.css', './src/base.css', './src/typography.css', './src/grid.css', './src/buttons.css', './src/forms.css', './src/links.css', './src/lists.css', './src/util.css', './src/misc.css'])
    .pipe($.concat('wing.css'))
    .pipe($.header(comment + '\n'))
    .pipe($.size())
    .pipe(gulp.dest('./dist/'));
});

gulp.task('minify', ['build'], function() {
  return gulp.src(['./dist/wing.css'])
    .pipe(minifyCSS())
    .pipe($.header(comment))
    .pipe($.size())
    .pipe($.concat('wing.min.css'))
    .pipe(gulp.dest('./dist/'));
});


gulp.task('watch', function() {
  gulp.watch(['src/*.css'], ['default']);
});


gulp.task('default', ['build', 'minify']);
