var Class = require('shipyard/class/Class'),
    View = require('shipyard/view/View'),
    ListView = require('shipyard/view/ListView');

var ListItem = new Class({

    Extends: View,

    template: require('../templates/app_item.ejs')

});

module.exports = new Class({

    Extends: ListView,

    tag: 'ol',

    itemView: ListItem

});
