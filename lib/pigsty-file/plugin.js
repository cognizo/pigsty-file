var debug = require('debug')('pigsty-file');
var PigstyPlugin = require('pigsty-plugin');
var fs = require('fs');

FilePlugin.prototype = new PigstyPlugin();
FilePlugin.prototype.constructor = PigstyPlugin;

var logLocation;

function FilePlugin(options) {
  PigstyPlugin.call(this, options);
  this.options = options;
};

FilePlugin.prototype.configure = function(callback) {
  fs.readFile('/etc/pigsty-file/config', function (err, data) {
    if (err) {
      logLocation = '/var/log/pigsty/events.log';
      callback();
    } else {
      logLocation = data.utf8Slice().trim();
      callback();
    }
  });
  debug('Configure Plugin: pigsty-file');
};

FilePlugin.prototype.start = function(callback) {
  emit('ready');
};

FilePlugin.prototype.stop = function(callback) {
  emit('end');
};

FilePlugin.prototype.send = function(event) {
  fs.appendFile(logLocation, event.json(), function (err) {
      if (err) throw err;
  });
};

module.exports = function(options) {
  return new FilePlugin(options);
};
