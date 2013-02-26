            __                     ___.         .__.__       .___            
    ______ |  | __  ____           \_ |__  __ __|__|  |    __| _/___________ 
    \____ \|  |/ / / ___\   ______  | __ \|  |  \  |  |   / __ |/ __ \_  __ \
    |  |_> >    < / /_/  > /_____/  | \_\ \  |  /  |  |__/ /_/ \  ___/|  | \/
    |   __/|__|_ \\___  /           |___  /____/|__|____/\____ |\___  >__|   
    |__|        \/_____/                \/                    \/    \/       

Install your app's NPM packages programatically.

## Usage

  First make sure you `pkg-builder` installed

```js
npm install pkg-builder
```

  When there's a `package.json` in the build folder

```js
var pkgBuilder = require('pkg-builder'),
    dir        = '/path/to/app',
    util       = require('util');

pkgBuilder.install(dir, function(err, dependencies) {
  if (err) { throw err; }

  // dependencies array, contains all the packages installed
  // along with their versions & relevant info
  console.log(util.inspect(dependencies, false, null));
});
```

  Passing the dependencies manually

```js
var pkgBuilder = require('./index'),
    dir        = '/path/to/app',
    util       = require('util');

var deps = {
  'pause-stream' : '*',
  'debug': '0.6.x'
};

pkgBuilder.install(dir, deps, function(err, dependencies) {
  if (err) { throw err; }

  console.log(util.inspect(dependencies, false, null));
});
```

## Running tests

```js
$ npm install
$ npm test
```

## License

MIT
