module.exports = function(search) {
    var userArgs = search;
    var searchPattern = userArgs[0];
    
    console.log('\x1b[32m', 'Owl Found the Following Files:' ,'\x1b[0m');
    
    var exec = require('child_process').exec;
    var child = exec('ls -a | grep ' + searchPattern, function(err, stdout, stderr) {
    console.log(stdout);
    if(err) {  console.log('\x1b[31m', 'ERROR:', '\x1b[0m', 'Something went wrong! \n The file probably doesn\'t exist' ); }
});
}  