# [gulp](http://gulpjs.com)-size [![Build Status](https://secure.travis-ci.org/sindresorhus/gulp-size.png?branch=master)](http://travis-ci.org/sindresorhus/gulp-size)

> Display the size of your project

![](screenshot.png)

Logs out the total size of files in the stream and optionally the individual file-sizes.


## Install

Install with [npm](https://npmjs.org/package/gulp-size)

```
npm install --save-dev gulp-size
```


## Example

```js
var gulp = require('gulp');
var size = require('gulp-size');

gulp.task('default', function () {
	gulp.src('fixture.js')
		.pipe(size())
		.pipe(gulp.dest('dist'));
});
```


## API

### size(options)

#### options

##### showFiles

Type: `Boolean`  
Default: `false`

Displays the size of every file instead of just the total size.


## License

MIT © [Sindre Sorhus](http://sindresorhus.com)
