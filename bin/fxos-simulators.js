#!/usr/bin/env node

var fs = require('fs');
var path = require('path');
var Table = require('cli-table');
var findSimulators = require('../index');

function getUserHome() {
  return process.env[(process.platform == 'win32') ? 'USERPROFILE' : 'HOME'];
}

var table = new Table({
  chars: { 'top': '' , 'top-mid': '' , 'top-left': '' , 'top-right': ''
         , 'bottom': '' , 'bottom-mid': '' , 'bottom-left': '' , 'bottom-right': ''
         , 'left': '' , 'left-mid': '' , 'mid': '' , 'mid-mid': ''
         , 'right': '' , 'right-mid': '' , 'middle': ' ' },
  style: { 'padding-left': 0, 'padding-right': 4 }
});

var opts = require("nomnom")
  .option('release', {
    help: 'Version of FirefoxOS',
    metavar: '<release version>',
    type: 'string',
    list: true
  })
  .option('json', {
    flag: true,
    help: 'Formats in json'
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
  if (opts.json) return console.log(b2gs);

  var header = ['RELEASE', 'BIN'];
  table.push(header);

  b2gs.forEach(function(b2g) {
    var row = [b2g.release, b2g.bin.replace(getUserHome(), '~')];
    table.push(row);
  });

  console.log(table.toString());
});