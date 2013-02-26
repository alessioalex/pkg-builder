var pkgBuilder = require('../index');
    util       = require('util');

// install all dependencies for the app that's located in the current folder
// all dependencies listed in package.json will be installed
pkgBuilder.install(__dirname, function(err, dependencies) {
  if (err) { throw err; }

  console.log(util.inspect(dependencies, false, null));
});
