import gulp           from 'gulp';
import gulpCleanCss   from 'gulp-clean-css';
import gulpConcat     from 'gulp-concat';
import gulpHeader     from 'gulp-header';
import gulpRename     from 'gulp-rename';
import gulpSize       from 'gulp-size';
import gulpSourcemaps from 'gulp-sourcemaps';
import pkg            from './package.json';

const comment = `/*
* Wing ${pkg.version}
* Copyright 2016, Kabir Shah
* http://usewing.ml/
* Free to use under the MIT license.
* http://www.opensource.org/licenses/mit-license.php
*/
`;

const dirs = {
  source: './src',
  dest  : './dist'
}

gulp.task('css', () => {
  return gulp.src([
    `${dirs.source}/top.css`,
    `${dirs.source}/base.css`,
    `${dirs.source}/typography.css`,
    `${dirs.source}/grid.css`,
    `${dirs.source}/buttons.css`,
    `${dirs.source}/forms.css`,
    `${dirs.source}/links.css`,
    `${dirs.source}/lists.css`,
    `${dirs.source}/util.css`,
    `${dirs.source}/misc.css`
  ])
  .pipe(gulpSourcemaps.init())
  .pipe(gulpConcat('wing.css'))
  .pipe(gulpHeader(comment))
  .pipe(gulpSize())
  .pipe(gulpSourcemaps.write('.'))
  .pipe(gulp.dest(`${dirs.dest}`));
})

gulp.task('css:minify', () => {
  return gulp.src([
    `${dirs.source}/top.css`,
    `${dirs.source}/base.css`,
    `${dirs.source}/typography.css`,
    `${dirs.source}/grid.css`,
    `${dirs.source}/buttons.css`,
    `${dirs.source}/forms.css`,
    `${dirs.source}/links.css`,
    `${dirs.source}/lists.css`,
    `${dirs.source}/util.css`,
    `${dirs.source}/misc.css`
  ])
  .pipe(gulpSourcemaps.init())
  .pipe(gulpConcat('wing.css'))
  .pipe(gulpCleanCss())
  .pipe(gulpHeader(comment))
  .pipe(gulpRename({
    suffix: '.min'
  }))
  .pipe(gulpSize())
  .pipe(gulpSourcemaps.write('.'))
  .pipe(gulp.dest(`${dirs.dest}`));
})


gulp.task('watch', () => {
  gulp.watch([`${dirs.source}/*.css`], ['css', 'css:minify']);
});


gulp.task('default', [
  'css',
  'css:minify',
  'watch'
]);

gulp.task('build', [
  'css',
  'css:minify'
]);
