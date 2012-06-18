// Module dependencies.
module.exports = function(app, configurations, express) {
  var clientSessions = require('client-sessions');
  var i18n = require('i18n-abide');
  var nconf = require('nconf');

  nconf.argv().env().file({ file: 'local.json' });

  // Configuration
  app.configure(function(){
    app.use(i18n.abide({
      supported_languages: ['en-US', 'de', 'es', 'db-LB', 'it-CH'],
      default_lang: 'en-US',
      debug_lang: 'it-CH',
      locale_directory: 'locale'
    }));
    app.set('views', __dirname + '/views');
    app.set('view engine', 'jade');
    app.set('view options', { layout: false });
    app.use(express.bodyParser());
    app.use(express.methodOverride());
    app.use(express.static(__dirname + '/public'));
    app.use(clientSessions({
      cookieName: nconf.get('cookieName'),
      secret: nconf.get('secret'), // MUST be set
      // true session duration:
      // will expire after duration (ms)
      // from last session.reset() or
      // initial cookieing.
      duration: 24 * 60 * 60 * 1000 * 7, // 1 week
    }));
    app.use(app.router);
  });

  app.configure('development', 'test', function(){
    app.set('DEBUG', true);
    app.use(express.errorHandler({ dumpExceptions: true, showStack: true }));
  });

  app.configure('production', function(){
    app.set('DEBUG', false);
    app.use(express.errorHandler());
  });

  app.helpers({
    DEBUG: app.set('DEBUG')
  })

  app.dynamicHelpers({
    session: function (req, res) {
      return req.session;
    }
  });

  return app;
};
