'use strict';

var emoji = require('./emoji.json');
var len = emoji.names.length;

module.exports = {
    random: function(){
        return emoji.names[Math.floor(Math.random()*len)];
    }
};