
var input1 = $('#field1')
var input2 = $('#field2')
var map, marker1

function initMap () {
  var directionsService = new google.maps.DirectionsService
  var directionsDisplay = new google.maps.DirectionsRenderer
  map = new google.maps.Map(document.getElementById('map'), {
    center: {lat: 1.307820, lng: 103.831830},
    zoom: 19
  })
  var autocomplete1 = new google.maps.places.Autocomplete(input1[0]) // adds autocomplete feature to Start bldg field
  var autocomplete2 = new google.maps.places.Autocomplete(input2[0])

  autocomplete1.addListener('place_changed', startPostalCode)
  autocomplete2.addListener('place_changed', endPostalCode)

  function startPostalCode () {
         // Get the place details from the autocomplete object.
    marker1.setAnimation(null)
    console.log('hey')
    var place = autocomplete1.getPlace()
    map.setCenter(place.geometry.location)
    marker1.setPosition(place.geometry.location)
    marker1.setAnimation(google.maps.Animation.DROP)
    var startPostal = place.formatted_address.substr(place.formatted_address.length - 6) // returns postal code from google map
    // fetch here

    var jsonPostal = JSON.stringify({
      startPostal
    })

    fetch('/route', {
      method: 'POST',
      body: jsonPostal,
      headers: {
        'Content-Type': 'application/json'
      }
    })
    .then(res => res.json())
    .then(json => {
      console.log('add to database')
    })
  }

  function endPostalCode () {
    marker1.setPosition(null)
    var place = autocomplete2.getPlace()
    var endPostal = place.formatted_address.substr(place.formatted_address.length - 6)
  }

  directionsDisplay.setMap(map)

  var onChangeHandler = function () {
    calculateAndDisplayRoute(directionsService, directionsDisplay)
  }
  $('#field2').on('change', onChangeHandler)
}
function calculateAndDisplayRoute (directionsService, directionsDisplay) {
  directionsService.route({
    origin: $('#field1').val(),
    destination: $('#field2').val(),
    travelMode: 'DRIVING'
  },
  function (response, status) {
    if (status === 'OK') {
      directionsDisplay.setDirections(response)
    } else {
      window.alert('Directions ' + status + ', please ensure valid addresses are entered in both Start and End fields.')
    }
  })
}
var options = {
  enableHighAccuracy: true,
  timeout: 5000,
  maximumAge: 0
}

function success(pos) {
  var crd = pos.coords
  //
  // console.log('Your current position is:')
  // console.log(`Latitude : ${crd.latitude}`)
  // console.log(`Longitude: ${crd.longitude}`)
  // console.log(`More or less ${crd.accuracy} meters.`)

  marker1 = new google.maps.Marker({
    position: new google.maps.LatLng(crd.latitude, crd.longitude),
    map: map,
    animation: google.maps.Animation.BOUNCE
  })

  map.setCenter({lat: crd.latitude, lng: crd.longitude})
};

function error(err) {
  console.warn(`ERROR(${err.code}): ${err.message}`);
};

navigator.geolocation.getCurrentPosition(success, error, options) // center the map on current location
