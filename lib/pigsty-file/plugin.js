var debug = require('debug')('pigsty-file');
var PigstyPlugin = require('pigsty-plugin');
var fs = require('fs');

FilePlugin.prototype = new PigstyPlugin();
FilePlugin.prototype.constructor = PigstyPlugin;

function FilePlugin(options) {
  PigstyPlugin.call(this, options);
  this.options = options;
};

FilePlugin.prototype.configure = function(callback) {
  debug('Configure Plugin: pigsty-file');
};

FilePlugin.prototype.start = function(callback) {
  emit('ready');
};

FilePlugin.prototype.stop = function(callback) {
  emit('end');
};

FilePlugin.prototype.send = function(event) {
  fs.appendFile('/var/log/pigsty/events.json', event.json(), function (err) {
      if (err) throw err;
  });
};

module.exports = function(options) {
  return new FilePlugin(options);
};
