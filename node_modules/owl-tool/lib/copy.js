var fs = require('fs');
var Path = require('path');
function copy(inFile, outFile) {
    var file = inFile[0];
    var out = outFile[0];
    if (!out || out === '') {
        out = file + '.txt';
    }
    fs.readFile(file, function(err, file) {
        if(err) {  
            console.log('\x1b[31m', 'ERROR:', '\x1b[0m', 'Something went wrong! \n Does the file exist?' );
        }
        console.log('\x1b[32m', 'Owl is copying the file' ,'\x1b[0m');
        fs.writeFile(out, file);
    });
}

module.exports = copy;