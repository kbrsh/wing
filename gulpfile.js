const gulp = require("gulp");
const pkg = require("./package.json");

const minifyCSS = require("gulp-clean-css");
const concat = require("gulp-concat");
const header = require("gulp-header");
const size = require("gulp-size");


const comment = `/**
 * Wing v${pkg.version}
 * Copyright 2016-2017 Kabir Shah
 * Released under the MIT License
 * http://usewing.ml
 */\r\n`;

gulp.task("build", function () {
  return gulp.src(["./src/base.css", "./src/typography.css", "./src/links.css", "./src/buttons.css", "./src/forms.css", "./src/grid.css", "./src/lists.css", "./src/tables.css", "./src/images.css", "./src/nav.css", "./src/cards.css", "./src/util.css", "./src/misc.css"])
    .pipe(concat("wing.css"))
    .pipe(header(comment + "\n"))
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
