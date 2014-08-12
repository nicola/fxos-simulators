# moz-find-b2g

Find Firefox OS simulators in your Firefox path

## Install

```
$ npm install moz-find-b2g
```

## Usage

```javascript
var findB2G = require('moz-find-b2g');
findB2G(function(err, b2gs){
  console.log(b2gs);
})
// [ { version: '2.1', path: '/Users/mozilla/Library/Application Support/Firefox/Profiles/x6kiu2xm.default/extensions/fxos_2_1_simulator@mozilla.org/b2g/B2G.app/Contents/MacOS/b2g-bin' } ]

```

or you can look for a specific version:

```javascript
var findB2G = require('moz-find-b2g');
findB2G({version:'2.1'}, function(err, b2gs){
  console.log(b2gs);
})
// [ { version: '2.1', path: '/Users/mozilla/Library/Application Support/Firefox/Profiles/x6kiu2xm.default/extensions/fxos_2_1_simulator@mozilla.org/b2g/B2G.app/Contents/MacOS/b2g-bin' } ]

```