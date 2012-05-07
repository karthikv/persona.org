var Class = require('shipyard/class/Class'),
    Observable = require('shipyard/class/Observable');

var api = require('../api');
var AppsList = require('../views/AppsList');

module.exports = new Class({

    Extends: Observable,

    initialize: function AppsController(data) {
        this.parent(data);

        this.list = new AppsList();
        this.list.attach('dashboard');
        this.getApps();
    },

    getApps: function getApps() {
        var controller = this;
        var pending = api.getInstalled();
        pending.addListener('success', function(results) {
            console.log('SUCCESS', results);
            results.forEach(function(r) {
                controller.list.addItem(r);
            });
        });
    }

});
