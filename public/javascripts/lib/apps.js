/* All functionality required for the app icons
 * Returns: the list of apps, which can be uninstalled.
 */

var Apps = function() {
  var getApps = function(apps) {
    var list = [];
    var appCount = apps.length;
    if (appCount > 0) {
      $("#help").hide();
    }

    for (var i = 0; i < apps.length; i ++) {
      var currentApp = apps[i];

      list.push({
        id: currentApp._id.replace(/[^0-9-]/g, ''),
        origin: currentApp._origin,
        title: currentApp.manifest.name,
        imageURL: currentApp.manifest.icons['128'],
        appObject: currentApp
      });
    }

    return list;
  }

  var self = {
    getInstalled: function() {
      var pending = navigator.mozApps.mgmt.getAll();

      pending.onsuccess = function () {
        var installedApps = getApps(pending.result);

        for (var i = 0; i < installedApps.length; i ++) {
          var appItem = $('<li><img src="" alt="" title=""><h3></h3></li>');

          appItem.find('img')
            .attr('src', installedApps[i].origin + installedApps[i].imageURL)
            .attr('alt', installedApps[i].title)
            .attr('title', installedApps[i].title);
          appItem.find('h3').text(installedApps[i].title);
          $('#dashboard ol').append(appItem);
        }

      };

      pending.onerror = function () {
        $('#help').hide();
        if (this.error == 'DENIED' || this.error.name == 'DENIED') {
          // Permission error
          $('#help-hostname').text(location.protocol + '//' + location.host);
          $('#help-permissions').show();
        }
      };
    },

    uninstall: function() {

    }
  };

  return self;
};