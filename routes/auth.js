var auth = require('../lib/authenticate');

module.exports = function(app, nconf) {
  // Login
  app.post('/login', function(req, res) {
    auth.verify(req, nconf, function(error, email) {
      if (email) {
        req.session.email = email;
      }
      res.redirect('/dashboard');
    });
  });

  // Logout
  app.get('/logout', function(req, res) {
    if (req.session) {
      delete req.session.email;
      delete req.session._csrf;
    }
    res.redirect('/?logged_out=1', 303);
  });
};
