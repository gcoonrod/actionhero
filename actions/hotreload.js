'use strict';

exports.action = {
  name:                   'hotreload',
  description:            'hotreload',
  blockedConnectionTypes: [],
  outputExample:          {},
  matchExtensionMimeType: false,
  version:                1.0,
  toDocument:             true,
  middleware:             [],

  inputs: {},

  run: function(api, data, next) {
    api.log("Received hotreload", "info");
    process.send({
      hotreload: true
    }, function (err) {
      data.response = {
        "hi": "christopher"
      }
      next(err);
    });
    
  }
};