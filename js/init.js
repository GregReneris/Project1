(function($){
  $(function(){

    $('.sidenav').sidenav();

// Init Slider
document.addEventListener('DOMContentLoaded', function() {
  var elems = document.querySelectorAll('.slider');
  var instances = M.Slider.init(elems, options);
});

// Or with jQuery


  $('.slider').slider({
    fullWidth:true,
    indicators:false,
    height:500
  });
  }); // end of document ready
})(jQuery); // end of jQuery name space
