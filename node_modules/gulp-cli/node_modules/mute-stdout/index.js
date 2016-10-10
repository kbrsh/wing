'use strict';

var ogWrite = process.stdout.write;

function noop(){}

function mute(){
  process.stdout.write = noop;
}

function unmute(){
  process.stdout.write = ogWrite;
}

module.exports = {
  mute: mute,
  unmute: unmute
};
