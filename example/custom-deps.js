var pkgBuilder = require('../index');
    util       = require('util');

var deps = {
  'pause-stream' : '*',
  'debug': '0.6.x'
};

// this will install the dependencies from `deps` into the current folder
pkgBuilder.install(__dirname, deps, function(err, dependencies) {
  if (err) { throw err; }

  console.log(util.inspect(dependencies, false, null));
});
