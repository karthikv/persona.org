var config = require('shipyard/logging/config');
var ConsoleHandler = require('shipyard/logging/ConsoleHandler');

exports.configure = function configure() {
  config({
    formatters: {
      'basic': {
        'format': '{name}.{levelname}: {message}'
      }
    },
    handlers: {
      'console': {
        'class': ConsoleHandler,
        'level': 'DEBUG',
        'formatter': 'basic'
      }
    },
    loggers: {
      'shipyard': {
        'level': 'WARNING',
        'propagate': false,
        'handlers': ['console']
      },
      'apps': {
        'level': 'DEBUG',
        'propagate': false,
        'handlers': ['console']
      }
    }
  });
};
