var Class = require('shipyard/class/Class');
var View = require('shipyard/view/View');
var ListView = require('shipyard/view/ListView');

var ListItem = new Class({

  Extends: View,

  template: require('../templates/app_item.ejs'),

  onClick: function onClick(ev) {
    if (ev.target.hasClass('delete')) {
      // delete button clicked!
      ev.preventDefault(); // stop the anchor from changing the page
    } else {
      // otherwise, they clicked anywhere else, lets LAUNCH!
      this.parentView.emit('appSelect', this);
    }
  }

});

module.exports = new Class({

  Extends: ListView,

  tag: 'ol',

  itemView: ListItem

});
