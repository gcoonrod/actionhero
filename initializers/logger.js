var winston = require('winston');

module.exports = {
  loadPriority:  120,
  initialize: function(api, next){

    if(api.config.logger.colors){
      winston.addColors(api.config.logger.colors);
    }

    var transports = [], i;
    for(i in api.config.logger.transports){
      var t = api.config.logger.transports[i];
      if(typeof t === 'function'){
        transports.push(t(api, winston));
      } else {
        transports.push(t);
      }
    }

    if(api.config.logger.levels){
      api.logger = new (winston.Logger)({ transports: transports, levels: api.config.logger.levels });
    }else{
      api.logger = new (winston.Logger)({ transports: transports, levels: winston.config.syslog.levels });
    }



    api.log = function(message, severity){
      if(severity === undefined || severity === null || api.logger.levels[severity] === undefined){ severity = 'info' }
      // if(severity == null || api.logger.levels[severity] == null){ severity = 'info' }
      var args = [ severity, message ];
      args.push.apply(args, Array.prototype.slice.call(arguments, 2));
      api.logger.log.apply(api.logger, args);
    }

    var logLevels = [];
    for(i in api.logger.levels){ logLevels.push(i) }

    api.log('*** starting actionhero ***', 'notice')
    api.log('Logger loaded.  Possible levels include: ', 'debug', logLevels);

    next();

  }
}
