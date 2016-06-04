var exec = require("child_process").exec;
var emoji = require('./extra/emoji.js')

// a little script for committing to github
// an emoji is the commit message :)
setInterval(function() {
    exec('git add . && git commit -m "' + emoji.random() + '"');
}), 1000; 
