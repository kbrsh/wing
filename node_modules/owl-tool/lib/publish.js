module.exports = function() {
    var exec = require('child_process').exec;
    exec('npm install && npm version ${1:-patch} && npm publish && git push --follow-tags', function(err, stdout, stderr) {
    console.log('\x1b[32m', 'Owl is publishing to NPM:' ,'\x1b[0m');
    console.log(stdout);
    if(err) {  console.log('\x1b[31m', 'ERROR:', '\x1b[0m', 'Something went wrong! \n Push to github if you havn\'t already.' ) ; }
});
};