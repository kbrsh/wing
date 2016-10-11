'use strict';

var archy = require('archy');
var chalk = require('chalk');
var log = require('gulplog');

var sortBy = require('lodash.sortby');
var isString = require('lodash.isstring');
var isObject = require('lodash.isplainobject');

function logTasks(tree, depth, getTask) {
  depth = (typeof depth !== 'number') ? null : ((depth < 1) ? 1 : depth);

  var lineInfos = [];
  var entryObserver = getLineInfoCollector(lineInfos);

  tree = copyTree(tree, depth, getTask, entryObserver);

  var spacer = getSpacerForLineIndents(tree, lineInfos);
  var lines = getLinesContainingOnlyBranches(tree);

  log.info(tree.label);
  printTreeList(lines, spacer, lineInfos);
}

function getLineInfoCollector(lineInfos) {
  return {
    topTask: function(node) {
      lineInfos.push({
        name: node.label,
        desc: node.desc,
        type: 'top',
      });
    },
    option: function(opt) {
      lineInfos.push({
        name: opt.label,
        desc: opt.desc,
        type: 'option',
      });
    },
    childTask: function(node) {
      lineInfos.push({
        name: node.label,
        type: 'child',
      });
    },
  };
}

function copyTree(tree, depth, getTask, entryObserver) {
  var newTree = {
    label: tree.label,
    nodes: [],
  };

  sortBy(tree.nodes, sorter).forEach(visit);

  function sorter(node) {
    return node.label;
  }

  function visit(node) {
    var task = getTask(node.label) || {};

    var newNode = {
      label: node.label,
      desc: isString(task.description) ? task.description : '',
      opts: [],
      nodes: [],
    };
    entryObserver.topTask(newNode);
    newTree.nodes.push(newNode);

    if (isObject(task.flags)) {
      Object.keys(task.flags).sort().forEach(function(flag) {
        if (flag.length === 0) {
          return;
        }
        var opt = {
          label: flag,
          desc: isString(task.flags[flag]) ? task.flags[flag] : '',
        };
        entryObserver.option(opt);
        newNode.opts.push(opt);
        newNode.label += '\n' + opt.label; // The way of archy for options.
      });
    }

    if (!depth || depth > 1) {
      var fn = function(child, maxDepth, nowDepth, newParent) {
        var newChild = {
          label: child.label,
          nodes: [],
        };
        entryObserver.childTask(newChild);
        newChild.label = ''; // Because don't use child tasks to calc indents.
        newParent.nodes.push(newChild);
        if (!maxDepth || maxDepth > nowDepth) {
          forEachNode(child.nodes, fn, maxDepth, nowDepth + 1, newChild);
        }
      };
      forEachNode(node.nodes, fn, depth, 2, newNode);
    }
  }

  return newTree;
}

function forEachNode(nodes, fn) {
  if (!Array.isArray(nodes)) {
    return;
  }

  var args = [].slice.call(arguments, 2);

  for (var i = 0, n = nodes.length; i < n; i++) {
    fn.apply(nodes[i], [nodes[i]].concat(args));
  }
}

function getSpacerForLineIndents(tree, lineInfos) {
  var maxSize = 0;
  var sizes = [];

  archy(tree)
    .split('\n')
    .slice(1, -1)
    .forEach(function(line, index) {
      var info = lineInfos[index];
      if (info.type === 'top' || info.type === 'option') {
        maxSize = Math.max(maxSize, line.length);
        sizes.push(line.length);
      } else {
        sizes.push(0);
      }
    });

  maxSize += 3;

  return function(index) {
    return Array(maxSize - sizes[index]).join(' ');
  };
}

function getLinesContainingOnlyBranches(tree) {
  tree.nodes.forEach(function(node) {
    node.label = '';
    node.opts.forEach(function() {
      node.label += '\n';
    });
  });

  return archy(tree)
    .split('\n')
    .slice(1, -1);
}

function printTreeList(lines, spacer, lineInfos) {
  lines.forEach(function(branch, index) {
    var info = lineInfos[index];

    var line = chalk.white(branch);

    if (info.type === 'top') {
      line += chalk.cyan(info.name);
      if (info.desc.length > 0) {
        line += spacer(index) + chalk.white(info.desc);
      }
    } else if (info.type === 'option') {
      line += chalk.magenta(info.name);
      if (info.desc.length > 0) {
        line += spacer(index) + chalk.white('…' + info.desc);
      }
    } else { // If (info.type === 'child') {
      line += chalk.white(info.name);
    }

    log.info(line);
  });
}

module.exports = logTasks;

