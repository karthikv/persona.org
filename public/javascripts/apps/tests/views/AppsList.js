var AppsList = require('../../views/AppsList');
var api = require('../../api');

module.exports = {

  'AppsList': function(it, setup) {
    it('should render an App', function(expect) {
      var list = new AppsList();

      list.addItem({
        id: '1234-5678-1324',
        origin: 'http://persona.org',
        title: 'Persona',
        imageURL: '/favicon.ico'
      });

      list.render();

      var li = list.toElement().getElement('li');
      expect(li.getElement('h3').get('text')).toBe('Persona');
    });
  },

  'AppUninstall': function(it, setup) {
    it('should uninstall an App', function(expect) {
      var list = new AppsList();

      list.addItem({
        id: '1234-5678-1324',
        origin: 'http://persona.org',
        title: 'Persona',
        imageURL: '/favicon.ico'
      });

      var li = list.toElement().getElement('.uninstall');
      var spy = this.createSpy();

      list.addListener('uninstallApp', spy);
      list.childViews[0].emit('click', { target: li, preventDefault: function noop() {} });

      expect(spy).toHaveBeenCalled();
    });
  }

};
