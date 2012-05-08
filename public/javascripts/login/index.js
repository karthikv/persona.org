var dom = require('shipyard/dom');

dom.$('login').addListener('click', function() {
    dom.window.get('navigator').id.getVerifiedEmail(function(assertion) {
        if (assertion) {
            var form = dom.$$('form.login')[0];
            form.getElement('input[name=bid_assertion]').set('value', assertion);
            form.submit();
        }
    });
});
