'use strict';

var chalk = require('chalk');
var log = require('gulplog');
var prettyTime = require('pretty-hrtime');

var exit = require('../../../shared/exit');
var formatError = require('../formatError');

// Wire up logging events
function logEvents(gulpInst) {

  // Exit with 0 or 1
  var failed = false;
  process.once('exit', function(code) {
    if (code === 0 && failed) {
      exit(1);
    }
  });

  // Total hack due to poor error management in orchestrator
  gulpInst.on('err', function() {
    failed = true;
  });

  gulpInst.on('task_start', function(e) {
    // TODO: batch these
    // so when 5 tasks start at once it only logs one time with all 5
    log.info('Starting', '\'' + chalk.cyan(e.task) + '\'...');
  });

  gulpInst.on('task_stop', function(e) {
    var time = prettyTime(e.hrDuration);
    log.info(
      'Finished', '\'' + chalk.cyan(e.task) + '\'',
      'after', chalk.magenta(time)
    );
  });

  gulpInst.on('task_err', function(e) {
    var msg = formatError(e);
    var time = prettyTime(e.hrDuration);
    log.error(
      '\'' + chalk.cyan(e.task) + '\'',
      chalk.red('errored after'),
      chalk.magenta(time)
    );
    log.error(msg);
  });

  gulpInst.on('task_not_found', function(err) {
    log.error(
      chalk.red('Task \'' + err.task + '\' is not in your gulpfile')
    );
    log.error('Please check the documentation for proper gulpfile formatting');
    exit(1);
  });
}

module.exports = logEvents;
