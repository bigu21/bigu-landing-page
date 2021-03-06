// Typekit Font Loader library
WebFont.load({
  google: {
    families: ['Lemon', 'Varela Round']
  }
});

$(document).ready(function() {

  var videoAttached = false;

  var w = Math.max(document.documentElement.clientWidth, window.innerWidth || 0);
  var h = Math.max(document.documentElement.clientHeight, window.innerHeight || 0);

  var attachVideo = function() {
    if(! videoAttached && w >= 768) {
      var video = document.createElement('video');

      video.autoplay = true;
      video.loop = true;

      video.innerHTML = "<source src='videos/Bigu-Landing-Page.webm' type='video/webm'>" +
        "<source src='videos/Bigu-Landing-Page.mp4' type='video/mp4'>";

      $('body').prepend(video);  
      videoAttached = true;
    }
  };


  $(window).on('resize', function() {

    w = Math.max(document.documentElement.clientWidth, window.innerWidth || 0);
    h = Math.max(document.documentElement.clientHeight, window.innerHeight || 0);

    attachVideo(); 
  });

    attachVideo(); 


  setTimeout(function() {
    $('header h1').show().css('animation', 'getIn 1500ms linear both');
    $('main').show().find('form').css('animation', 'fadeIn 1000ms linear both');
  }, 1000);


  $('form').submit(function(ev) {

  ev.preventDefault();

  $.post('/', $(this).serialize(), function(data) {
    if(data.error) {
      var $form = $('form input[type="email"]');
      $form.focus();
      $form.addClass('error wobble');

      var msg;

      if(data.errorType === 'already-registered')
        msg = 'Ops, você já se cadastrou!';
      else if(data.errorType === 'invalid-email')
        msg = 'Ops, email inválido!';
      else
        msg = 'Ops, erro, tente novamente!';

      $form.val('').attr('placeholder', msg).select().focus();

      setTimeout(function() {
        $form.removeClass('wobble');
      }, 1000);
    } else {
       $('header, main').hide(1);
       $('.success').show().css('animation', 'fadeIn 1000ms linear both');
    }
  }, 'json');
});

});
