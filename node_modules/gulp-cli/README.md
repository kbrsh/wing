<p align="center">
  <a href="http://gulpjs.com">
    <img height="257" width="114" src="https://raw.githubusercontent.com/gulpjs/artwork/master/gulp-2x.png">
  </a>
</p>

# gulp-cli

[![NPM version][npm-image]][npm-url] [![Downloads][downloads-image]][npm-url] [![Build Status][travis-image]][travis-url] [![AppVeyor Build Status][appveyor-image]][appveyor-url] [![Coveralls Status][coveralls-image]][coveralls-url] [![Gitter chat][gitter-image]][gitter-url]

Command Line Utility for Gulp

## Usage

```bash
> gulp [flags] tasks
```

## Custom Metadata

When listing tasks with the `gulp -T` command, gulp-cli displays some custom metadata as defined upon task functions. Currently supported properties:

* `task.description` - String of the description to display.

```js
function clean() { ... }
clean.description = 'Cleans up generated files.';
```

* `task.flags` - Object with key/value pairs being flag/description to display.

```js
function build() { ... }
build.flags = {
  '--prod': 'Builds in production mode.'
};
```

Example Usage:

```js
function build() { ... }
build.description = 'Build entire project.';
build.flags = {
  '--prod': 'Builds in production mode (minification, etc).'
};
// gulp 3.x
gulp.task('build', build);
// gulp 4.x
gulp.task(build);
```

## Tasks

Tasks can be executed by running `gulp <task> <othertask>`. Just running `gulp` will execute the task you registered called `default`. If there is no `default` task, gulp will error.

## Completion
> Thanks to the grunt team, specifically Tyler Kellen

To enable tasks auto-completion in shell you should add `eval "$(gulp --completion=shell)"` in your `.shellrc` file.

###### Bash:

Add `eval "$(gulp --completion=bash)"` to `~/.bashrc`.

###### Zsh:

Add `eval "$(gulp --completion=zsh)"` to `~/.zshrc`.

###### Powershell:

Add `Invoke-Expression ((gulp --completion=powershell) -join [System.Environment]::NewLine)` to `$PROFILE`.

###### Fish:

Add `gulp --completion=fish | source` to `~/.config/fish/config.fish`.

## Compilers

You can find a list of supported languages at https://github.com/js-cli/js-interpret. If you would like to add support for a new language, send pull requests/open issues on that project.

## Environment

The CLI adds process.env.INIT_CWD which is the original cwd it was launched from.

## Flags

gulp has very few flags to know about. All other flags are for tasks to use if needed.

__Some flags only work with gulp 4 and will be ignored when invoked against gulp 3.__

<table>
  <thead>
    <tr>
      <th width="25%">Flag</th>
      <th width="15%">Short Flag</th>
      <th>Description</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>--help</td>
      <td>-h</td>
      <td>Show this help.</td>
    </tr>
    <tr>
      <td>--version</td>
      <td>-v</td>
      <td>Print the global and local gulp versions.</td>
    </tr>
    <tr>
      <td>--require [path]</td>
      <td></td>
      <td>Will require a module before running the gulpfile. This is useful for transpilers but also has other applications.</td>
    </tr>
    <tr>
      <td>--gulpfile [path]</td>
      <td></td>
      <td>Manually set path of gulpfile. Useful if you have multiple gulpfiles. This will set the CWD to the gulpfile directory as well.</td>
    </tr>
    <tr>
      <td>--cwd [path]</td>
      <td></td>
      <td>Manually set the CWD. The search for the gulpfile, as well as the relativity of all requires will be from here.</td>
    </tr>
    <tr>
      <td>--verify [path (optional)]</td>
      <td></td>
      <td>Will verify plugins referenced in project's package.json against the plugins blacklist.</td>
    </tr>
    <tr>
      <td>--tasks</td>
      <td>-T</td>
      <td>Print the task dependency tree for the loaded gulpfile.</td>
    </tr>
    <tr>
      <td>--depth [number]</td>
      <td></td>
      <td>Specify the depth of the task dependency tree to print.</td>
    </tr>
    <tr>
      <td>--tasks-simple</td>
      <td></td>
      <td>Print a plaintext list of tasks for the loaded gulpfile.</td>
    </tr>
    <tr>
      <td>--tasks-json [path]</td>
      <td></td>
      <td>Print the task dependency tree, in JSON format, for the loaded gulpfile. The [path] argument is optional, and if given writes the JSON to the path.</td>
    </tr>
    <tr>
      <td>--color</td>
      <td></td>
      <td>Will force gulp and gulp plugins to display colors, even when no color support is detected.</td>
    </tr>
    <tr>
      <td>--no-color</td>
      <td></td>
      <td>Will force gulp and gulp plugins to not display colors, even when color support is detected.</td>
    </tr>
    <tr>
      <td>--silent</td>
      <td>-S</td>
      <td>Suppress all gulp logging.</td>
    </tr>
    <tr>
      <td>--continue</td>
      <td></td>
      <td>Continue execution of tasks upon failure.</td>
    </tr>
    <tr>
      <td>--log-level</td>
      <td>-L</td>
      <td>Set the loglevel. -L for least verbose and -LLLL for most verbose. -LLL is default.</td>
    </tr>
  </tbody>
</table>

## License

MIT

[gittip-url]: https://www.gittip.com/WeAreFractal/
[gittip-image]: http://img.shields.io/gittip/WeAreFractal.svg

[downloads-image]: http://img.shields.io/npm/dm/gulp-cli.svg
[npm-url]: https://npmjs.org/package/gulp-cli
[npm-image]: http://img.shields.io/npm/v/gulp-cli.svg

[travis-url]: https://travis-ci.org/gulpjs/gulp-cli
[travis-image]: http://img.shields.io/travis/gulpjs/gulp-cli.svg?label=travis-ci

[appveyor-url]: https://ci.appveyor.com/project/gulpjs/gulp-cli
[appveyor-image]: https://img.shields.io/appveyor/ci/gulpjs/gulp-cli.svg?label=appveyor

[coveralls-url]: https://coveralls.io/r/gulpjs/gulp-cli
[coveralls-image]: http://img.shields.io/coveralls/gulpjs/gulp-cli/master.svg

[gitter-url]: https://gitter.im/gulpjs/gulp
[gitter-image]: https://badges.gitter.im/gulpjs/gulp.png
