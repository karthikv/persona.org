var AppsController = require('./controllers/AppsController');
var API = require('./api');

exports.init = function init() {
  new AppsController({
    api: new API()
  });
};

exports.init();
