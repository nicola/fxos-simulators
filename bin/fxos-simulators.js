#!/usr/bin/env node

var fs = require('fs');
var path = require('path');
var findSimulators = require('../index');

var opts = require("nomnom")
  .option('sdk', {
    help: 'Version of FirefoxOS',
    metavar: '<sdk version>'
  })
  .option('version', {
    flag: true,
    help: 'Print version and exit',
    callback: function() {
      fs.readFile(path.resolve(__dirname, '../package.json'), 'utf-8', function(err, file) {
        console.log(JSON.parse(file).version);
      });
    }
  })
  .parse();

if (opts.version) return;

findSimulators(opts, function(err, b2gs){
  console.log(b2gs);
});