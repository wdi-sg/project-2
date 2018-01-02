$(document).ready(function() {

// express messages delay and disappear
$('#messages').ready(function() {
  $('#messages').delay(5000).fadeOut();
});


// css select
$('select').material_select();


// css modal
$('.modal').modal();


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



// end of document ready
});
