var logSettings = require('./logging');
var AppsController = require('./controllers/AppsController');
var API = require('./api');

exports.init = function init() {
  logSettings.configure();
  new AppsController({
    api: new API()
  });
};

exports.init();
