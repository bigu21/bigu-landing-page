// Typekit Font Loader library
WebFont.load({
  google: {
    families: ['Lemon', 'Varela Round']
  }
});

$(document).ready(function() {
  setTimeout(function() {
    $('header h1').show().css('animation', 'getIn 1500ms linear both');
    $('main').show().find('form').css('animation', 'fadeIn 1000ms linear both');
  }, 800);


$('form').submit(function(ev) {

  ev.preventDefault();

  $.post('/', $(this).serialize(), function(data) {
    if(data.error) {
      var $form = $('form input[type="email"]');
      $form.focus();
      $form.addClass('error wobble');
      $form.val('').attr('placeholder', 'Ops, você já se cadastrou!').select().focus();

      setTimeout(function() {
        $form.removeClass('wobble');
      }, 1000);
    } else {
       $('header, main').hide();
       $('.success').show().css('animation', 'fadeIn 1000ms linear both');
    }
  }, 'json');
});

});
