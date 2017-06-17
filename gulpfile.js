'use strict';

var gulp = require('gulp');
var pkg = require('./package.json');
var minifyCSS = require('gulp-minify-css');
var comment = `/**
 * Wing v${pkg.version}
 * Copyright 2016-2017 Kabir Shah
 * Released under the MIT License
 * http://usewing.ml
 */\r\n`;
var $ = require('gulp-load-plugins')();

gulp.task('build', function () {
  return gulp.src(['./src/base.css', './src/typography.css', './src/links.css', './src/buttons.css', './src/forms.css', './src/grid.css', './src/lists.css', './src/tables.css', './src/nav.css', './src/cards.css', './src/util.css', './src/misc.css'])
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
    .pipe($.size({
      gzip: true
    }))
    .pipe($.concat('wing.min.css'))
    .pipe(gulp.dest('./dist/'));
});


gulp.task('watch', function() {
  gulp.watch(['src/*.css'], ['default']);
});


gulp.task('default', ['build', 'minify']);
