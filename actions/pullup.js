'use strict';
const spawn = require('child_process').spawn;

var bluebird;

exports.action = {
  name:                   'pullup',
  description:            'pullup',
  blockedConnectionTypes: [],
  outputExample:          {},
  matchExtensionMimeType: false,
  version:                1.0,
  toDocument:             true,
  middleware:             [],

  inputs: {},

  run: function(api, data, next) {
    let error = null;
    const install = spawn('npm', ['install', '--save', 'bluebird']);

    install.stdout.on('data', (data) => {
      api.log("stdout: ", "info", data.toString('ascii'));
    });

    install.stderr.on('data', (data) => {
      api.log("stderr: ", "error", data.toString('ascii'));
    });

    install.on('close', (code) => {
      api.log("Child process exited with code " + code, "info");
      next(error);
    });

  }
};
