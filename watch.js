var exec = require("child_process").exec;
var emoji = require('./extra/emoji.js')

// emoji is commit :)
setInterval(function() {
    exec('git add . && git commit -m "' + emoji.random() + '"');
}), 1000; 
