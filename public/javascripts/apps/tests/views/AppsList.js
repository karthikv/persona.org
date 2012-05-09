var AppsList = require('../../views/AppsList');

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
  }

};
