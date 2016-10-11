# mute-stdout

[![Travis Build Status](https://img.shields.io/travis/js-cli/mute-stdout/master.svg?label=travis&style=flat-square)](https://travis-ci.org/js-cli/mute-stdout)

Mute and unmute stdout

## Usage

```js
var stdout = require('mute-stdout');

stdout.mute();

console.log('will not print');

stdout.unmute();

console.log('will print');
```

## API

### mute()

Mutes the `process.stdout` stream by replacing the `write` method with a no-op function.

### unmute()

Unmutes the `process.stdout` stream by restoring the original `write` method.

## License

MIT
