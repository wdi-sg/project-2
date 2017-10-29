$(document).ready(function () {
  console.log('js file is connected')
  $('.dropdown-button').dropdown()
  // $('#textarea1').val('New Text')
  $('#textarea1').trigger('autoresize')
  $('select').material_select()
  $('.button-collapse').sideNav()
  $('.carousel').carousel({indicators: true})
  // $('#my_audio').get(0).play()
  $('.slider').slider()
  $('.datepicker').pickadate({
   selectMonths: true, // Creates a dropdown to control month
   selectYears: 15, // Creates a dropdown of 15 years to control year,
   today: 'Today',
   clear: 'Clear',
   close: 'Ok',
   closeOnSelect: false // Close upon selecting a date,
  });

  initMap()
})

function initMap () {
  var locations = [
    ['Malta Adventure', 35.937496, 14.375416, 8],
    ['Belfast Adventure', 55.2311523, -6.5181327, 7],
    ['Hobbiton Caves Adventure', -37.872194, 175.68321, 6],
    ['4WD Wakatipu Adventure', -45.0907964, 168.5474718, 5],
    ['Oxfordshire Adventure', 51.7612056, -1.2464674, 4],
    ['Village Adventure', 51.794968, -1.8838937, 3],
    ['London Studio Adventure', 51.6929437, -0.4204523, 2],
    ['Oxford Adventure', 51.7472602, -1.2455286, 1]
  ]

  var map = new google.maps.Map(document.getElementById('map'), {
    zoom: 2,
    center: new google.maps.LatLng(27.05912578, 77.6953125),
    mapTypeId: google.maps.MapTypeId.ROADMAP
  })

  var infowindow = new google.maps.InfoWindow()

  var marker, i
  for (i = 0; i < locations.length; i++) {
    marker = new google.maps.Marker({
      position: new google.maps.LatLng(locations[i][1], locations[i][2]),
      map: map
    })

    google.maps.event.addListener(marker, 'click', (function (marker, i) {
      return function () {
        infowindow.setContent(locations[i][0])
        infowindow.open(map, marker)
      }
    })(marker, i))
  }
}
