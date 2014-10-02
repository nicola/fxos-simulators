# fxos-simulators

Find Firefox OS simulators in your Firefox path.

This is part of [node-fxos](https://github.com/nicola/node-fxos)' project.

## Install

```sh
# Library
$ npm install fxos-simulators

# Command line
$ npm install -g fxos-simulators
```

## Usage

#### Command line

```sh
$ fxos-simulators --help
Usage: fxos-simulators [options]

Options:
   --release <release version>   Version of FirefoxOS
   --json                        Formats in json
   --version                     Print version and exit
```


#### Node library

```javascript
var findSimulators = require('fxos-simulators');
findSimulators(function(err, simulators){
  console.log(simulators);
})
// [ { version: '2.1', path: '/Users/mozilla/Library/Application Support/Firefox/Profiles/x6kiu2xm.default/extensions/fxos_2_1_simulator@mozilla.org/b2g/B2G.app/Contents/MacOS/b2g-bin' } ]

```

or you can look for a specific version:

```javascript
var findSimulators = require('fxos-simulators');
findSimulators({version:'2.1'}, function(err, simulators){
  console.log(simulators);
})
// [ { version: '2.1', path: '/Users/mozilla/Library/Application Support/Firefox/Profiles/x6kiu2xm.default/extensions/fxos_2_1_simulator@mozilla.org/b2g/B2G.app/Contents/MacOS/b2g-bin' } ]

```
