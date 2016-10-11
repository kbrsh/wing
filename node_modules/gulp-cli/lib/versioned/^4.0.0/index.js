'use strict';

var fs = require('fs');

var log = require('gulplog');
var chalk = require('chalk');
var stdout = require('mute-stdout');
var tildify = require('tildify');

var exit = require('../../shared/exit');

var logTasks = require('../../shared/log/tasks');
var logEvents = require('./log/events');
var logSyncTask = require('./log/syncTask');
var logTasksSimple = require('./log/tasksSimple');
var registerExports = require('../../shared/registerExports');

var getTask = require('./log/getTask');

function execute(opts, env) {

  var tasks = opts._;
  var toRun = tasks.length ? tasks : ['default'];

  if (opts.tasksSimple || opts.tasks || opts.tasksJson) {
    // Mute stdout if we are listing tasks
    stdout.mute();
  }

  var gulpInst = require(env.modulePath);
  logEvents(gulpInst);
  logSyncTask(gulpInst);

  // This is what actually loads up the gulpfile
  var exported = require(env.configPath);

  registerExports(gulpInst, exported);

  // Always unmute stdout after gulpfile is required
  stdout.unmute();

  process.nextTick(function() {
    var tree;

    if (opts.tasksSimple) {
      tree = gulpInst.tree();
      return logTasksSimple(tree.nodes);
    }
    if (opts.tasks) {
      tree = gulpInst.tree({ deep: true });
      tree.label = 'Tasks for ' + chalk.magenta(tildify(env.configPath));

      return logTasks(tree, opts.depth, getTask(gulpInst));
    }
    if (opts.tasksJson) {
      tree = gulpInst.tree({ deep: true });
      tree.label = 'Tasks for ' + tildify(env.configPath);

      var output = JSON.stringify(tree);

      if (typeof opts.tasksJson === 'boolean' && opts.tasksJson) {
        return console.log(output);
      }
      return fs.writeFileSync(opts.tasksJson, output, 'utf-8');
    }
    try {
      log.info('Using gulpfile', chalk.magenta(tildify(env.configPath)));
      gulpInst.parallel(toRun)(function(err) {
        if (err) {
          exit(1);
        }
      });
    } catch (err) {
      log.error(chalk.red(err.message));
      log.error('To list available tasks, try running: gulp --tasks');
      exit(1);
    }
  });
}

module.exports = execute;
