(function($) {

  $(function() {
    // Browser ID login
    $('.sign-in').click(function() {
      navigator.id.getVerifiedEmail(function(assertion) {
        if (assertion) {
          $('form.login input[name="bid_assertion"]').val(assertion);
          $('form.login').submit();
        }
      });
    });
  });

})(jQuery);
