'use strict';

var fancyLog = require('fancy-log');

function noop() {}

// The sorting of the levels is
// significant.
var levels = [
  'error', // -L: Logs error events.
  'warn',  // -LL: Logs warn and error events.
  'info',  // -LLL: Logs info, warn and error events.
  'debug', // -LLLL: Logs all log levels.
];

function toConsole(log, opts) {
  // Return immediately if logging is
  // not desired.
  if (opts.tasksSimple || opts.silent) {
    // Keep from crashing process when silent.
    log.on('error', noop);
    return;
  }

  // Default loglevel to info level (3).
  var loglevel = opts.logLevel || 3;

  levels
    .filter(function(item, i) {
      return i < loglevel;
    })
    .forEach(function(level) {
      if (level === 'error') {
        log.on(level, fancyLog.error);
      } else {
        log.on(level, fancyLog);
      }
    });
}

module.exports = toConsole;
