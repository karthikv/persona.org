var DEFAULT_ICON = '/images/default-icon.png';
var DEFAULT_SIZE = 128;

var EventEmitter = require('shipyard/class/Events');
var utils = require('shipyard/utils/object');
var dom = require('shipyard/dom');
var navigator = dom.window.get('navigator');
var mozApps = navigator.mozApps;

function gotApps(apps) {
  var list = [];

  for (var i = 0; i < apps.length; i ++) {
    var currentApp = apps[i];

    list.push({
      id: currentApp._id.replace(/[^0-9\-]/g, ''),
      origin: currentApp._origin,
      title: currentApp.manifest.name,
      imageURL: getIconForSize(DEFAULT_SIZE, currentApp),
      appObject: currentApp
    });
  }

  return list;
}

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

exports = module.exports = new EventEmitter();

if (mozApps && mozApps.mgmt) {
  mozApps.mgmt.oninstall = function(ev) {
    exports.emit('install', ev.application);
  };

  mozApps.mgmt.onuninstall = function(ev) {
    exports.emit('uninstall', ev.application);
  };
}

exports.getInstalled = function getInstalled() {
  var pending = mozApps.mgmt.getAll();
  var emitter = new EventEmitter();

  pending.onsuccess = function () {
    var installedApps = gotApps(pending.result);
    emitter.apps = installedApps;
    emitter.result = pending.result;
    emitter.emit('success', emitter.apps);
  };

  pending.onerror = function () {
    emitter.emit('error');
  };
  return emitter;
};

exports.uninstall = function uninstall(app) {
  var pending = app.uninstall();
  var emitter = new EventEmitter();

  pending.onsuccess = function() {
    emitter.emit('success', 200);
  };

  pending.onerror = function () {
    emitter.emit('error');
  };
  return emitter;
};
