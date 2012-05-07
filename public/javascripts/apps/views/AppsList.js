var Class = require('shipyard/class/Class'),
    ListView = require('shipyard/view/ListView');

module.exports = new Class({

    Extends: ListView,

    tag: 'ol',

    itemViewOptions: {
        template: require('../templates/app_item.ejs')
    }

});
