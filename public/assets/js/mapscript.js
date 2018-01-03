var input1 = $('#field1')
var input2 = $('#field2')
var $userId = $('#user')
var $timeInput = $('#time')
var $currentLocation = $('#currentLocation')
var map, marker1, autocomplete1, autocomplete2

function initMap () {
  var directionsService = new google.maps.DirectionsService
  var directionsDisplay = new google.maps.DirectionsRenderer
  map = new google.maps.Map(document.getElementById('map'), {
    center: {lat: 1.307820, lng: 103.831830},
    zoom: 19
  })
  directionsDisplay.setMap(map)

  autoComplete()
  var onChangeHandler = function () {
    calculateAndDisplayRoute(directionsService, directionsDisplay)
  }
  $('#field2').change(function () {
    setTimeout(onChangeHandler, 100)
  })
}

function autoComplete () {
  autocomplete1 = new google.maps.places.Autocomplete(input1[0]) // adds autocomplete feature to Start bldg field
  autocomplete2 = new google.maps.places.Autocomplete(input2[0])

  autocomplete1.addListener('place_changed', startPostalCode)

  const $checkRoute = $('.checkRoute')
  $checkRoute.on('submit', function (e) {
    e.preventDefault()

    address1 = autocomplete1.getPlace().formatted_address
    var postal1 = (address1.substr(address1.length - 6))
    if (parseInt(postal1)) {
      var postal1 = parseInt(postal1)
    } else {
      input1.val('')
      input2.val('')
      return alert('Start bldg needs to be an address with a postal code')
    }
    address2 = autocomplete2.getPlace().formatted_address
    var postal2 = parseInt(address2.substr(address2.length - 6))
    if (parseInt(postal2)) {
      var postal2 = parseInt(postal2)
    } else {
      input1.val('')
      input2.val('')
      return alert('End bldg needs to be an address with a postal code')
    }
    var postalArray = [postal1, postal2]
    var jsonInput = JSON.stringify({
      postalArray,
      user: $userId.val(),
      time: $timeInput.val()
    })
    fetch('/route', {
      method: 'PUT',
      body: jsonInput,
      headers: {
        'Content-Type': 'application/json'
      }
    })
    .then(res => {
      res.json()
        .then((data) => {
          $("#databaseResponse").text(`There are a total of ${data} user(s) looking for the same trip. Buzz associates will contact you if there are suitable arrangements.`)
        })
    })
    .catch(err => console.log(err))
  })
  function startPostalCode () {
    marker1.setAnimation(null)
    var place1 = autocomplete1.getPlace()
    map.setCenter(place1.geometry.location)
    marker1.setPosition(place1.geometry.location)
    marker1.setAnimation(google.maps.Animation.DROP)
  }
}
function calculateAndDisplayRoute (directionsService, directionsDisplay) {
  marker1.setPosition(null)
  directionsService.route({
    origin: autocomplete1.getPlace().formatted_address,
    destination: autocomplete2.getPlace().formatted_address,
    travelMode: 'DRIVING'
  },
  function (response, status) {
    if (status === 'OK') {
      directionsDisplay.setDirections(response)
    } else {
      input1.val('')
      input2.val('')
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
