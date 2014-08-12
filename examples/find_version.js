var findB2G = require('../index');

findB2G({version:'2.0'}, function(err, b2gs) {
  console.log(b2gs);
});