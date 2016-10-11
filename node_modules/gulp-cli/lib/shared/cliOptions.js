'use strict';

var chalk = require('chalk');

module.exports = {
  help: {
    alias: 'h',
    type: 'boolean',
    desc: chalk.gray(
      'Show this help.'),
  },
  version: {
    alias: 'v',
    type: 'boolean',
    desc: chalk.gray(
      'Print the global and local gulp versions.'),
  },
  require: {
    type: 'string',
    requiresArg: true,
    desc: chalk.gray(
      'Will require a module before running the gulpfile. ' +
      'This is useful for transpilers but also has other applications.'),
  },
  gulpfile: {
    type: 'string',
    requiresArg: true,
    desc: chalk.gray(
      'Manually set path of gulpfile. Useful if you have multiple gulpfiles. ' +
      'This will set the CWD to the gulpfile directory as well.'),
  },
  cwd: {
    type: 'string',
    requiresArg: true,
    desc: chalk.gray(
      'Manually set the CWD. The search for the gulpfile, ' +
      'as well as the relativity of all requires will be from here.'),
  },
  verify: {
    desc: chalk.gray(
      'Will verify plugins referenced in project\'s package.json against ' +
      'the plugins blacklist.'),
  },
  tasks: {
    alias: 'T',
    type: 'boolean',
    desc: chalk.gray(
      'Print the task dependency tree for the loaded gulpfile.'),
  },
  depth: {
    type: 'number',
    requiresArg: true,
    desc: chalk.gray(
      'Specify the depth of the task dependency tree.'),
  },
  'tasks-simple': {
    type: 'boolean',
    desc: chalk.gray(
      'Print a plaintext list of tasks for the loaded gulpfile.'),
  },
  'tasks-json': {
    desc: chalk.gray(
      'Print the task dependency tree, ' +
      'in JSON format, for the loaded gulpfile.'),
  },
  color: {
    type: 'boolean',
    desc: chalk.gray(
      'Will force gulp and gulp plugins to display colors, ' +
      'even when no color support is detected.'),
  },
  'no-color': {
    type: 'boolean',
    desc: chalk.gray(
      'Will force gulp and gulp plugins to not display colors, ' +
      'even when color support is detected.'),
  },
  silent: {
    alias: 'S',
    type: 'boolean',
    desc: chalk.gray(
      'Suppress all gulp logging.'),
  },
  continue: {
    type: 'boolean',
    desc: chalk.gray(
      'Continue execution of tasks upon failure.'),
  },
  'log-level': {
    alias: 'L',
    // Type isn't needed because count acts as a boolean
    count: true,
    // Can't use `default` because it seems to be off by one
    desc: chalk.gray(
      'Set the loglevel. -L for least verbose and -LLLL for most verbose. ' +
      '-LLL is default.'),
  },
};
