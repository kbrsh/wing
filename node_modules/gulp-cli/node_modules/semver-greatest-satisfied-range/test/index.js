'use strict';

var lab = exports.lab = require('lab').script();
var code = require('code');

var findRange = require('../');

lab.experiment('findRange', function(){

  lab.test('works with different versions', function(done){
    var range = findRange('1.0.0', ['^0.9.0', '^1.0.0', '^2.0.0']);
    code.expect(range).to.equal('^1.0.0');
    done();
  });

  lab.test('works with multiple matching versions', function(done){
    var range = findRange('1.2.0', ['^1.0.0', '^1.1.0', '^1.2.0']);
    code.expect(range).to.equal('^1.2.0');
    done();
  });

  lab.test('returns null with no matching versions', function(done){
    var range = findRange('1.2.0', ['~1.0.0', '~1.1.0']);
    code.expect(range).to.equal(null);
    done();
  });
});
