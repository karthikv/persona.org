var EventEmitter = require('shipyard/class/Events');
var dom = require('shipyard/dom');
var navigator = dom.window.get('navigator');
var apps = navigator.apps;

function gotApps(_apps) {
    var list = [];
    var appCount = _apps.length;
    if (appCount > 0) {
      //$("#help").hide();
    }

    for (var i = 0; i < _apps.length; i ++) {
      var currentApp = _apps[i];

      list.push({
        id: currentApp._id.replace(/[^0-9\-]/g, ''),
        origin: currentApp._origin,
        title: currentApp.manifest.name,
        imageURL: currentApp.manifest.icons['128'],
        appObject: currentApp
      });
    }

    return list;
}


exports.getInstalled = function getInstalled() {
    var pending = navigator.mozApps.mgmt.getAll();
    var emitter = new EventEmitter();

    pending.onsuccess = function () {
        var installedApps = gotApps(pending.result);
        emitter.apps = installedApps;
        emitter.result = pending.result;
        emitter.emit('success', pending.apps);
    };

    pending.onerror = function () {
        emitter.emit('error');
    };
    return emitter;
};

exports.uninstall = function uninstall() {

};
