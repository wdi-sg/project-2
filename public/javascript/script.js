$(document).ready(function() {

let geocoder = new google.maps.Geocoder()
let service = new google.maps.places.Autocomplete(
  document.getElementById('placesSearch')
)

$("#addPlace").click(function () {
  geocoder.geocode( { 'address': $("#placesSearch").val()}, function(results, status) {
    if (status == 'OK') {
      let url = "/location/new"
      let obj = {
        locationName : $("#placesSearch").val(),
        latitude : results[0].geometry.location.lat(),
        longitude : results[0].geometry.location.lng(),
        tripId : $("#tripId").val()
      }
      $.ajax({
        url: url,
        type: "POST",
        data: obj,
        success: function(data) {
          window.location.reload();
        },
        error: function (res, msg, err) {
          alert("Opps");
        }
      })
    } //End Status OK
    else {
      console.log('Geocode was not successful for the following reason: ' + status)
    }
  });
}); //End #placesSearch click

});
