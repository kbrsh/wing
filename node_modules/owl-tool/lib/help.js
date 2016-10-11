module.exports = function() {
    console.log('\x1b[32m', 'Owl is a command line tool:' ,'\x1b[0m');
    console.log('\x1b[33m', '===== USAGE =====' ,'\x1b[0m');
    console.log('\x1b[34m', 'owl help', '\x1b[35m', 'display this help message' ,'\x1b[0m');
    console.log('\x1b[34m', 'owl search <phrase>', '\x1b[35m', 'search files for phrase' ,'\x1b[0m');
    console.log('\x1b[34m', 'owl publish', '\x1b[35m', 'simple npm publish' ,'\x1b[0m');
    console.log('\x1b[34m', 'owl copy <inputFile> <outputFile>', '\x1b[35m', 'copy the input file contents to the output file' ,'\x1b[0m');
};