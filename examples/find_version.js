var simulators = require('../index');

simulators({version:'2.0'}, function(err, sims) {
  console.log(sims);
});