'use strict';

var chalk = require('chalk');
var log = require('gulplog');

var exit = require('../exit');

function logBlacklistError(err) {
  log.error(chalk.red('Error: failed to retrieve plugins black-list'));
  log.error(err.message); // Avoid duplicating for each version
  exit(1);
}

module.exports = logBlacklistError;
