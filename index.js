"use strict";

var exec  = require('child_process').exec,
    path  = require('path'),
    fs    = require('fs'),
    util  = require('util'),
    debug = require('debug')('module-builder');

function parseJson(str) {
  var jsonObj;

  try {
    jsonObj = JSON.parse(str);
  }
  catch (err) {
    return new Error('Failed to parse package.json file');
  }

  return jsonObj;
}

function readIfExists(filePath, callback) {
  // verify that file exists
  fs.exists(filePath, function(exists) {
    if (!exists) {
      return callback(new Error('File ' + filePath + ' not found'));
    }

    // read file content
    fs.readFile(filePath, 'utf-8', callback);
  });
}

function getPackageDeps(dir, callback) {
  // read file content
  readIfExists(path.join(dir, 'package.json'), function(err, content) {
    var pkg;

    if (err) { return callback(err); }

    pkg = parseJson(content);

    if (util.isError(pkg)) {
      callback(pkg);
    } else {
      callback(null, pkg.dependencies);
    }
  });
}

// dependencies formatted for NPM usage: express@3.1.x treeit@*
function getFormattedDeps(dependencyObj) {
  var str = [];

  Object.keys(dependencyObj).forEach(function(dep) {
    str.push(dep + '@' + dependencyObj[dep]);
  });

  return str.join(' ');
}

// main function
function install(dir, deps, callback) {
  // deps param optional
  if (typeof deps === 'function') {
    callback = deps;

    getPackageDeps(dir, function(err, deps) {
      if (err) { return callback(err); }

      executeNpm(dir, deps, callback);
    });
  } else {
    executeNpm(dir, deps, callback);
  }
}

function executeNpm(dir, deps, callback) {
  var cmd, execOpts;

  if (!deps) { return callback('No dependencies found'); }

  deps = getFormattedDeps(deps);

  cmd  = 'npm install ' + deps;
  cmd += ' --loglevel error --json';

  execOpts = {
    cwd     : dir,
    env     : {
      PATH     : process.env.PATH,
      NODE_ENV : 'production'
    }
  };

  debug('cmd', cmd);
  debug('execOpts', execOpts);

  exec(cmd, execOpts, function(err, stdout, stderr) {
    var res = {};

    if (err) { return callback(err, stdout, stderr); }

    try {
      res = JSON.parse(stdout);
    }
    catch (er) {
     //...
    }

    callback(err, res, stderr);
  });
}

module.exports = {
  parseJson        : parseJson,
  readIfExists     : readIfExists,
  getPackageDeps   : getPackageDeps,
  getFormattedDeps : getFormattedDeps,
  executeNpm       : executeNpm,
  install          : install
};
