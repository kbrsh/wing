const gulp = require("gulp");
const pkg = require("./package.json");

const minifyCSS = require("gulp-clean-css");
const concat = require("gulp-concat");
const header = require("gulp-header");
const size = require("gulp-size");
const stylus = require("gulp-stylus");

const comment = `/**
 * Wing v${pkg.version}
 * Copyright 2016-2017 Kabir Shah
 * Released under the MIT License
 * http://usewing.ml
 */\r\n`;

gulp.task("build", function () {
  return gulp.src(["./src/config.styl", "./src/base.styl", "./src/grid.styl", "./src/typography.styl", "./src/form.styl", "./src/button.styl", "./src/link.styl", "./src/list.styl", "./src/image.styl", "./src/nav.styl", "./src/card.styl", "./src/code.styl", "./src/divider.styl", "./src/util.styl"])
    .pipe(concat("wing.styl"))
    .pipe(stylus())
    .pipe(header(comment + "\r\n"))
    .pipe(size())
    .pipe(gulp.dest("./dist/"));
});

gulp.task("minify", ["build"], function() {
  return gulp.src(["./dist/wing.css"])
    .pipe(minifyCSS())
    .pipe(header(comment))
    .pipe(size())
    .pipe(size({
      gzip: true
    }))
    .pipe(concat("wing.min.css"))
    .pipe(gulp.dest("./dist/"));
});


gulp.task("watch", function() {
  gulp.watch(["src/*.css"], ["default"]);
});


gulp.task("default", ["build", "minify"]);
