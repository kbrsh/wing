var exec = require("child_process").exec;

setInterval(function() {
    exec('git add . && git commit -m "update"');
}), 5000;