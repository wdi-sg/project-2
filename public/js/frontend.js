$(document).ready(function () {
  console.log('js file is connected')
  $('.dropdown-button').dropdown()
  $('#textarea1').val('New Text')
  $('#textarea1').trigger('autoresize')
  $('select').material_select()
  $(".button-collapse").sideNav();
  $('.carousel').carousel({indicators: true});

  // initMap()
  var locations = [
        ['Bondi Beach', -33.890542, 151.274856, 4],
        ['Coogee Beach', -33.923036, 151.259052, 5],
        ['Cronulla Beach', -34.028249, 151.157507, 3],
        ['Manly Beach', -33.80010128657071, 151.28747820854187, 2],
        ['Maroubra Beach', -33.950198, 151.259302, 1]
  ]

  var map = new google.maps.Map(document.getElementById('map'), {
    zoom: 2,
    center: new google.maps.LatLng(-33.92, 151.25),
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
})
