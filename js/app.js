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
});
