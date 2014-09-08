var simulators = require('../index');

simulators({release:['2.0']}, function(err, sims) {
  console.log(sims);
});