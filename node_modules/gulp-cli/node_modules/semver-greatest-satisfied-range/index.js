'use strict';

var semver = require('semver');
var semverRe = require('semver-regex');

function findRange(version, ranges){
  var validRanges = ranges.filter(function(range){
    return semver.satisfies(version, range);
  });

  var sortedRanges = validRanges.sort(function(a, b){
    var aStripped = semverRe().exec(a)[0];
    var bStripped = semverRe().exec(b)[0];
    return semver.rcompare(aStripped, bStripped);
  });

  if(sortedRanges.length){
    return sortedRanges[0];
  }

  return null;
}

module.exports = findRange;
