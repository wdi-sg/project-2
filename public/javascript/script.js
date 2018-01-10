$(document).ready(function() {

let geocoder = new google.maps.Geocoder()
let service = new google.maps.places.Autocomplete(
  document.getElementById('placesSearch')
)

initMap();

function initMap() {
  $.ajax({
    url: "/location/getAllForTrip?id="+$("#tripId").val(),
    type: "GET",
    success: function(data) {
      if (data.length > 0) {
        // Start loading Maps
        var map = new google.maps.Map(document.getElementById('map'), {
          zoom: 12,
          center: {lat: data[0].latitude, lng: data[0].longitude}
        });
        for (var i = 0; i < data.length; i++) {
          var data2 = data[i]
          var coor = new google.maps.LatLng(data2.latitude, data2.longitude);
          var marker = new google.maps.Marker({
            position: coor,
            map: map,
            title: data.locationName
          });
        }
      }
      // var marker = new google.maps.Marker({
      //   position: uluru,
      //   map: map
      // });
    },//End Success From Ajax
    error: function (res, msg, err) {
      console.log("Opps initMap");
    }
  })//End Ajax
}

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
          console.log("Opps geocoder");
        }
      })
    } //End Status OK
    else {
      console.log('Geocode was not successful for the following reason: ' + status)
    }
  });
}); //End #placesSearch click

});
