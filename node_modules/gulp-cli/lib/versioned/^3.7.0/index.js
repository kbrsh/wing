'use strict';

var chalk = require('chalk');
var log = require('gulplog');
var stdout = require('mute-stdout');
var tildify = require('tildify');

var taskTree = require('./taskTree');
var logTasks = require('../../shared/log/tasks');
var logEvents = require('./log/events');
var logTasksSimple = require('./log/tasksSimple');
var registerExports = require('../../shared/registerExports');

function execute(opts, env) {
  var tasks = opts._;
  var toRun = tasks.length ? tasks : ['default'];

  if (opts.tasksSimple || opts.tasks) {
    // Mute stdout if we are listing tasks
    stdout.mute();
  }

  // This is what actually loads up the gulpfile
  var exported = require(env.configPath);
  log.info('Using gulpfile', chalk.magenta(tildify(env.configPath)));

  var gulpInst = require(env.modulePath);
  logEvents(gulpInst);

  registerExports(gulpInst, exported);

  // Always unmute stdout after gulpfile is required
  stdout.unmute();

  process.nextTick(function() {
    if (opts.tasksSimple) {
      return logTasksSimple(env, gulpInst);
    }
    if (opts.tasks) {
      var tree = taskTree(gulpInst.tasks);
      tree.label = 'Tasks for ' + chalk.magenta(tildify(env.configPath));
      return logTasks(tree, opts.depth, function(task) {
        return gulpInst.tasks[task].fn;
      });
    }
    gulpInst.start.apply(gulpInst, toRun);
  });
}

module.exports = execute;
