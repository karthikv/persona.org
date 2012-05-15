var Class = require('shipyard/class/Class');
var Observable = require('shipyard/class/Observable');
var dom = require('shipyard/dom');
var View = require('shipyard/view/View');

var AppsList = require('../views/AppsList');

module.exports = new Class({

  Extends: Observable,

  api: null,

  initialize: function AppsController(data) {
    this.parent(data);
    var controller = this;

    this.list = new AppsList({
      onAppSelect: function(itemView) {
        controller._onAppSelect(itemView);
      },
      onUninstallApp: function(itemView) {
        controller._onUninstallApp(itemView);
      }
    });
    this.list.attach('dashboard');
    this.getApps();

    var helpId = 'help';
    this.help = new View({
      element: dom.$(helpId),
      id: helpId
    });

    // help's visibility depends on if the list is empty.
    this.help.bind(this.list, {
      'isVisible': 'isEmpty'
    });

  },

  getApps: function getApps() {
    var controller = this;
    var pending = this.api.getInstalled();

    pending.addListener('success', function(results) {
      results.forEach(function(r) {
        controller.list.addItem(r);
      });
    });
  },

  _onAppSelect: function _onAppSelect(appView) {
    var appObject = appView.get('content').appObject;

    if (appObject) {
      appObject.launch();
    }
  },

  _onUninstallApp: function _onUninstallApp(appView) {
    var controller = this;
    var content = appView.get('content');
    var appObject = content.appObject;
    var pending = api.uninstall(appObject);

    pending.addListener('success', function() {
      controller.list.removeItem(content);
    });
  }

});
