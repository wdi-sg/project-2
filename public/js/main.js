$(document).ready(function() {

// express messages delay and disappear
$('#messages').ready(function() {
  $('#messages').delay(5000).fadeOut();
});


// css select
$('select').material_select();


// css modal
$('.modal').modal();


// trigger for textarea
$('#review').trigger('autoresize');


// google maps autocomplete
function initialize() {
let options = {
  componentRestrictions: {
    country: 'sg'
  }
};
let input = document.getElementById('location');
let autocomplete = new google.maps.places.Autocomplete(input, options);
}
google.maps.event.addDomListener(window, 'load', initialize);


// delete for bookmark
$('.delete-bookmark').on('click', function(e) {
  e.preventDefault();

  $.ajax({
    url: $(this).attr('href'),
    type: 'DELETE',
    success: function(data) {
      console.log(data);
      window.location.reload();
    },
    error: function(err) {
console.log(err);
    }
  });
});


// delete for review
$('.delete-review').on('click', function(e) {
  e.preventDefault();

  $.ajax({
    url: $(this).attr('href'),
    type: 'DELETE',
    success: function(data) {
      console.log(data);
      window.location.href = '/';
    },
    error: function(err) {
      console.log(err);
    }
  });
});



// end of document ready
});
