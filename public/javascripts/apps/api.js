var DEFAULT_ICON = '/images/default-icon.png';
var DEFAULT_SIZE = 128;

var Class = require('shipyard/class/Class');
var EventEmitter = require('shipyard/class/Events');
var ObservableArray = require('shipyard/class/ObservableArray');
var utils = require('shipyard/utils/object');
var dom = require('shipyard/dom');
var navigator = dom.window.get('navigator');
var mozApps = navigator.mozApps;

var logging = require('shipyard/logging');
var log = logging.getLogger('apps.api');

function getIconForSize(targetSize, app) {
  var manifest = app.manifest;

  if (manifest && manifest.icons) {
    var bestFit = 0;
    var biggestFallback = 0;

    utils.forEach(manifest.icons, function(icon, defaultSize) {
      var iconSize = parseInt(defaultSize, 10);

      if (bestFit === 0 || iconSize >= targetSize) {
        bestFit = iconSize;
      }

      if (biggestFallback === 0 || iconSize > biggestFallback) {
        biggestFallback = iconSize;
      }
    });
    
    if (bestFit !== 0 || biggestFallback !== 0) {
      var icon = manifest.icons[bestFit || biggestFallback];
      return icon;
    }
  }
  return DEFAULT_ICON;
}

function wrapApp(app) {
  return {
    origin: app._origin || app.origin,
    title: app.manifest.name,
    imageURL: getIconForSize(DEFAULT_SIZE, app),
    appObject: app
  };
}

function indexOf(arr, app) {
  for (var i = 0; i < arr.length; i++) {
    if (arr[i].origin === app.origin) {
      return i;
    }
  }
  return -1;
}

function gotApps(apps) {
  var list = new ObservableArray();

  for (var i = 0; i < apps.length; i ++) {
    var currentApp = apps[i];
    list.push(wrapApp(currentApp));
  }

  return list;
}



module.exports = new Class({

  Implements: EventEmitter,

  initialize: function API() {
    var api = this;
    if (mozApps && mozApps.mgmt) {
      mozApps.mgmt.oninstall = function(ev) {
        log.debug('mgmt.oninstall', ev.application.origin);
        api.emit('install', ev.application);
      };

      mozApps.mgmt.onuninstall = function(ev) {
        log.debug('mgmt.onuninstall', ev.application.origin);
        api.emit('uninstall', ev.application);
      };
    }
  },

  getInstalled: function getInstalled() {
    var api = this;

    var pending = mozApps.mgmt.getAll();
    var emitter = new EventEmitter();

    pending.onsuccess = function () {
      var installedApps = gotApps(pending.result);
      emitter.apps = installedApps;
      emitter.result = pending.result;
      api.addListener('install', function(app) {
        installedApps.push(wrapApp(app));
      });
      api.addListener('uninstall', function(app) {
        var index = indexOf(installedApps, app);
        if (index > -1) {
          installedApps.splice(index, 1);
        }
      });
      emitter.emit('success', emitter.apps);
    };

    pending.onerror = function () {
      emitter.emit('error');
    };
    return emitter;
  },

  uninstall: function uninstall(app) {
    var pending = app.uninstall();
    var emitter = new EventEmitter();

    pending.onsuccess = function() {
      emitter.emit('success', 200);
    };

    pending.onerror = function () {
      emitter.emit('error');
    };
    return emitter;
  }

});
