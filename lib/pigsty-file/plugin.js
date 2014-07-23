var debug = require('debug')('pigsty-file');
var PigstyPlugin = require('pigsty-plugin');
var fs = require('fs');

FilePlugin.prototype = new PigstyPlugin();
FilePlugin.prototype.constructor = PigstyPlugin;

function FilePlugin(options) {
  PigstyPlugin.call(this, options);
  this.options = options;
  if (!this.options.location) {
    throw new Error("'location' must be defined under the 'file' section of the pigsty configuration");
  }
};

FilePlugin.prototype.configure = function(callback) {
  debug('Configure Plugin: pigsty-file');
};

FilePlugin.prototype.start = function(callback) {
  debug('ready');
};

FilePlugin.prototype.stop = function(callback) {
  debug('end');
};

FilePlugin.prototype.send = function(event) {
  fs.appendFile(this.options.location, event.json(), function (err) {
      if (err) throw err;
  });
};

module.exports = function(options) {
  return new FilePlugin(options);
};
