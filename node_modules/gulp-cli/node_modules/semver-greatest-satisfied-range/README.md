semver-greatest-satisfied-range
===============================

[![Build Status](https://travis-ci.org/phated/semver-greatest-satisfied-range.svg?branch=master)](https://travis-ci.org/phated/semver-greatest-satisfied-range)

Find the greatest satisfied semver range from an array of ranges.

## Usage

```js
var findRange = require('semver-greatest-satisfied-range');

var range = findRange('1.1.0', ['^1.0.0', '^1.1.0', '^1.2.0']);
// range === '^1.1.0'
```

## API

### `findRange(version, rangeArray)`

Takes a version and array of ranges, returns the greatest satisfied range.

## License

MIT
