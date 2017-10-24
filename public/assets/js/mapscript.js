function initMap () {
  var directionsService = new google.maps.DirectionsService
  var directionsDisplay = new google.maps.DirectionsRenderer
  var map = new google.maps.Map(document.getElementById('map'), {
    center: {lat: 1.307820, lng: 103.831830},
    zoom: 19
  })
  var input = $('#field1')
  console.log(input[0])
  var autocomplete = new google.maps.places.Autocomplete(input[0])
  autocomplete.bindTo('bounds', map)

  directionsDisplay.setMap(map)

  var onChangeHandler = function () {
    calculateAndDisplayRoute(directionsService, directionsDisplay)
  }
  $('#start').on('change', onChangeHandler)
  $('#end').on('change', onChangeHandler)
}
function calculateAndDisplayRoute (directionsService, directionsDisplay) {
  directionsService.route({
    origin: $('#start').val(),
    destination: $('#end').val(),
    travelMode: 'DRIVING'
  },
function (response, status) {
  if (status === 'OK') {
    directionsDisplay.setDirections(response)
  } else {
    window.alert('Directions request failed due to ' + status)
  }
})
}
